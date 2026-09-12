using System.Diagnostics;

namespace WildGooseChase.Services;

public class ScraperService
{
    private readonly string _pythonPath;
    private readonly string _scriptPath;

    private Process? _process;
    private DateTime? _startedAt;

    public ScraperService(IConfiguration config, IWebHostEnvironment env)
    {
        _pythonPath =
            config["Scraper:PythonPath"]
            ?? Environment.GetEnvironmentVariable("PYTHON_PATH")
            ?? "python";

        _scriptPath =
            config["Scraper:ScriptPath"]
            ?? Path.Combine(
                env.ContentRootPath,
                "..",
                "waterloo-works-scraper",
                "main.py"
            );
    }

    public bool IsRunning =>
        _process is not null && !_process.HasExited;

    public DateTime? StartedAt => _startedAt;

    public int? ProcessId =>
        _process is not null && !_process.HasExited
            ? _process.Id
            : null;

    public async Task StartAsync(
        CancellationToken cancellationToken = default)
    {
        if (IsRunning)
        {
            throw new InvalidOperationException(
                "The scraper is already running."
            );
        }

        if (!File.Exists(_scriptPath))
        {
            throw new FileNotFoundException(
                "Could not find the Python scraper.",
                _scriptPath
            );
        }

        var processStartInfo = new ProcessStartInfo
        {
            FileName = _pythonPath,
            WorkingDirectory = Path.GetDirectoryName(_scriptPath)!,
            UseShellExecute = false,
            CreateNoWindow = true,
            RedirectStandardOutput = true,
            RedirectStandardError = true
        };

        processStartInfo.ArgumentList.Add(_scriptPath);

        _process = Process.Start(processStartInfo)
            ?? throw new InvalidOperationException(
                "Failed to start the Python scraper."
            );

        _startedAt = DateTime.UtcNow;

        _ = MonitorProcessAsync(_process);
    }

    private async Task MonitorProcessAsync(Process process)
    {
        try
        {
            var outputTask = process.StandardOutput.ReadToEndAsync();
            var errorTask = process.StandardError.ReadToEndAsync();

            await process.WaitForExitAsync();

            var output = await outputTask;
            var errors = await errorTask;

            Console.WriteLine("========== SCRAPER OUTPUT ==========");
            Console.WriteLine(output);

            if (!string.IsNullOrWhiteSpace(errors))
            {
                Console.WriteLine("========== SCRAPER ERRORS ==========");
                Console.WriteLine(errors);
            }

            Console.WriteLine(
                $"Scraper exited with code {process.ExitCode}"
            );
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Scraper process failed: {ex}");
        }
        finally
        {
            process.Dispose();
            _process = null;
            _startedAt = null;
        }
    }
}
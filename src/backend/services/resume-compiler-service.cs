using System.Diagnostics;

namespace WildGooseChaseResumeApi.Services;

public class LatexCompileException : Exception
{
    public string CompilerLog { get; }

    public LatexCompileException(string message, string compilerLog) : base(message)
    {
        CompilerLog = compilerLog;
    }
}

public class ResumeCompilerService
{
    private readonly string _preambleText;
    private readonly string _tectonicPath;
    public ResumeCompilerService(IConfiguration config, IWebHostEnvironment env)
    {
        var preamblePath = Path.Combine(env.ContentRootPath, "templates", "jakes-resume-preamble.tex");
        _preambleText = File.ReadAllText(preamblePath);

        

        // Override with an explicit path via appsettings.json ("Tectonic:Path")
        // or the TECTONIC_PATH env var if tectonic isn't on the system PATH.
        _tectonicPath = config["Tectonic:Path"]
            ?? Environment.GetEnvironmentVariable("TECTONIC_PATH")
            ?? "tectonic";

        Console.WriteLine($"TECTONIC PATH = {_tectonicPath}");

    }

    public async Task<byte[]> CompileToPdfAsync(string latexBody, CancellationToken cancellationToken = default)
    {
        var workDir = Path.Combine(Path.GetTempPath(), "resume-compile-" + Guid.NewGuid());
        Directory.CreateDirectory(workDir);

        try
        {
            
            var texPath = Path.Combine(workDir, "resume.tex");
            var fullDocument = _preambleText + "\n" + latexBody + "\n\\end{document}\n";
            Console.WriteLine("========== GENERATED LATEX ==========");
Console.WriteLine(fullDocument);
Console.WriteLine("========== END GENERATED LATEX ==========");
            await File.WriteAllTextAsync(texPath, fullDocument, cancellationToken);

            var psi = new ProcessStartInfo
            {
                FileName = _tectonicPath,
                WorkingDirectory = workDir,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
            };
            psi.ArgumentList.Add("resume.tex");
            psi.ArgumentList.Add("--outdir");
            psi.ArgumentList.Add(workDir);

            using var process = Process.Start(psi)
                ?? throw new InvalidOperationException("Failed to start the tectonic process.");

            var stdOutTask = process.StandardOutput.ReadToEndAsync();
            var stdErrTask = process.StandardError.ReadToEndAsync();
            await process.WaitForExitAsync(cancellationToken);

            var stdOut = await stdOutTask;
            var stdErr = await stdErrTask;

            var pdfPath = Path.Combine(workDir, "resume.pdf");
            if (process.ExitCode != 0 || !File.Exists(pdfPath))
            {
                throw new LatexCompileException(
                    "Tectonic failed to compile the document.",
                    stdOut + "\n" + stdErr);
            }

            return await File.ReadAllBytesAsync(pdfPath, cancellationToken);
        }
        finally
        {
            // Best-effort cleanup — a stray temp dir isn't fatal if this fails.
            try { Directory.Delete(workDir, recursive: true); } catch { }
        }
    }
}
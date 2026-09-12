using Microsoft.AspNetCore.Mvc;
using WildGooseChase.Services;

namespace WildGooseChase.Controllers;

[ApiController]
[Route("api/scraper")]
public class ScraperController : ControllerBase
{
    private readonly ScraperService _scraperService;

    public ScraperController(ScraperService scraperService)
    {
        _scraperService = scraperService;
    }

    [HttpPost("start")]
    public async Task<IActionResult> Start(
        CancellationToken cancellationToken)
    {
        if (_scraperService.IsRunning)
        {
            return Conflict(new
            {
                message = "The scraper is already running."
            });
        }

        await _scraperService.StartAsync(cancellationToken);

        return Ok(new
        {
            message = "Scraper started successfully."
        });
    }

    [HttpGet("status")]
    public IActionResult GetStatus()
    {
        return Ok(new
        {
            running = _scraperService.IsRunning,
            processId = _scraperService.ProcessId,
            startedAt = _scraperService.StartedAt
        });
    }
}
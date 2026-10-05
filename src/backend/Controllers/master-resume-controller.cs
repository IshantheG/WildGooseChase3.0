using Microsoft.AspNetCore.Mvc;
using WildGooseChase.Models;
using WildGooseChase.Services;

namespace WildGooseChase.Controllers;

[ApiController]
[Route("api/master-resume/save")]
public class MasterResumeController : ControllerBase
{
    private readonly AIContextService _aiContextService;

    public MasterResumeController(AIContextService aiContextService)
    {
        _aiContextService = aiContextService;
    }

    [HttpGet]
    public async Task<IActionResult> GetContext(
        [FromQuery] string id = "singleton",
        CancellationToken cancellationToken = default)
    {
        var context = await _aiContextService.GetOrCreateAsync(
            id,
            cancellationToken);

        return Ok(context);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetContextById(
        string id,
        CancellationToken cancellationToken = default)
    {
        var context = await _aiContextService.GetOrCreateAsync(
            id,
            cancellationToken);

        return Ok(context);
    }

    [HttpPost("{id}/resume-bank")]
    public async Task<IActionResult> SaveResumeBank(
        string id,
        [FromBody] SaveTextRequest request,
        CancellationToken cancellationToken = default)
    {
        var context = await _aiContextService.SaveResumeBankAsync(
            id,
            request?.Text,
            cancellationToken);

        return Ok(context);
    }

    [HttpPost("{id}/ai-prompt")]
    public async Task<IActionResult> SaveAIPrompt(
        string id,
        [FromBody] SaveTextRequest request,
        CancellationToken cancellationToken = default)
    {
        var context = await _aiContextService.SaveAIPromptAsync(
            id,
            request?.Text,
            cancellationToken);

        return Ok(context);
    }
}

    
using Microsoft.EntityFrameworkCore;
using WildGooseChase.Data;
using WildGooseChase.Models;

namespace WildGooseChase.Services;

public class AIContextService
{
    private readonly AppDbContext _context;

    public AIContextService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<AIContext> GetOrCreateAsync(
        string id,
        CancellationToken cancellationToken = default)
    {
        var normalizedId = NormalizeId(id);
        var context = await _context.AIContext.FirstOrDefaultAsync(
            entry => entry.Id == normalizedId,
            cancellationToken);

        if (context != null)
        {
            return context;
        }

        context = new AIContext
        {
            Id = normalizedId
        };

        _context.AIContext.Add(context);
        await _context.SaveChangesAsync(cancellationToken);

        return context;
    }

    public async Task<AIContext> SaveResumeBankAsync(
        string id,
        string? resumeBank,
        CancellationToken cancellationToken = default)
    {
        var context = await GetOrCreateTrackedAsync(id, cancellationToken);
        context.ResumeBank = resumeBank ?? "";

        await _context.SaveChangesAsync(cancellationToken);

        return context;
    }

    public async Task<AIContext> SaveAIPromptAsync(
        string id,
        string? aiPrompt,
        CancellationToken cancellationToken = default)
    {
        var context = await GetOrCreateTrackedAsync(id, cancellationToken);
        context.AIPrompt = aiPrompt ?? "";

        await _context.SaveChangesAsync(cancellationToken);

        return context;
    }

    private async Task<AIContext> GetOrCreateTrackedAsync(
        string id,
        CancellationToken cancellationToken)
    {
        var normalizedId = NormalizeId(id);
        var context = await _context.AIContext.FirstOrDefaultAsync(
            entry => entry.Id == normalizedId,
            cancellationToken);

        if (context != null)
        {
            return context;
        }

        context = new AIContext
        {
            Id = normalizedId
        };

        _context.AIContext.Add(context);
        return context;
    }

    private static string NormalizeId(string id)
    {
        return string.IsNullOrWhiteSpace(id)
            ? "singleton"
            : id.Trim();
    }
}
using Microsoft.EntityFrameworkCore;
using WildGooseChase.Data;
using WildGooseChase.Models;

namespace WildGooseChase.Services;

public class JobService
{
    private readonly AppDbContext _context;

    public JobService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Job>> GetJobsAsync(
        CancellationToken cancellationToken = default)
    {
        return await _context.Jobs
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task<Job?> GetJobAsync(
        string id,
        CancellationToken cancellationToken = default)
    {
        return await _context.Jobs
            .AsNoTracking()
            .FirstOrDefaultAsync(
                job => job.Id == id,
                cancellationToken);
    }

    public async Task<Job> AddJobAsync(
        Job job,
        CancellationToken cancellationToken = default)
    {
        var existingJob = await _context.Jobs
            .FirstOrDefaultAsync(
                existing => existing.Id == job.Id,
                cancellationToken);

        if (existingJob != null)
        {
            return existingJob;
        }

        _context.Jobs.Add(job);
        await _context.SaveChangesAsync(cancellationToken);

        return job;
    }

    public async Task<int> AddJobsAsync(
        IEnumerable<Job> jobs,
        CancellationToken cancellationToken = default)
    {
        var jobList = jobs.ToList();

        if (jobList.Count == 0)
        {
            return 0;
        }

        var jobIds = jobList
            .Select(job => job.Id)
            .ToList();

        var existingIds = await _context.Jobs
            .Where(job => jobIds.Contains(job.Id))
            .Select(job => job.Id)
            .ToHashSetAsync(cancellationToken);

        var newJobs = jobList
            .Where(job => !existingIds.Contains(job.Id))
            .ToList();

        if (newJobs.Count == 0)
        {
            return 0;
        }

        await _context.Jobs.AddRangeAsync(
            newJobs,
            cancellationToken);

        await _context.SaveChangesAsync(cancellationToken);

        return newJobs.Count;
    }
}
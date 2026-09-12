using Microsoft.AspNetCore.Mvc;
using WildGooseChase.Models;
using WildGooseChase.Services;

namespace WildGooseChase.Controllers;

[ApiController]
[Route("api/jobs")]
public class JobController : ControllerBase
{
    private readonly JobService _jobService;

    public JobController(JobService jobService)
    {
        _jobService = jobService;
    }

    [HttpGet]
    public async Task<IActionResult> GetJobs(
        CancellationToken cancellationToken)
    {
        var jobs = await _jobService.GetJobsAsync(cancellationToken);

        return Ok(jobs);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetJob(
        string id,
        CancellationToken cancellationToken)
    {
        var job = await _jobService.GetJobAsync(
            id,
            cancellationToken);

        if (job == null)
        {
            return NotFound();
        }

        return Ok(job);
    }

    [HttpPost]
    public async Task<IActionResult> AddJob(
        [FromBody] Job job,
        CancellationToken cancellationToken)
    {
        var existingJob = await _jobService.GetJobAsync(
            job.Id,
            cancellationToken);

        if (existingJob != null)
        {
            return Conflict(new
            {
                message = $"Job {job.Id} already exists."
            });
        }

        var createdJob = await _jobService.AddJobAsync(
            job,
            cancellationToken);

        return CreatedAtAction(
            nameof(GetJob),
            new { id = createdJob.Id },
            createdJob);
    }

    [HttpPost("bulk")]
    public async Task<IActionResult> AddJobs(
        [FromBody] List<Job> jobs,
        CancellationToken cancellationToken)
    {
        var addedCount = await _jobService.AddJobsAsync(
            jobs,
            cancellationToken);

        return Ok(new
        {
            message = "Jobs processed successfully.",
            added = addedCount,
            received = jobs.Count
        });
    }
}
namespace WildGooseChase.Data;
using Microsoft.EntityFrameworkCore;
using WildGooseChase.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Resume> Resumes => Set<Resume>();
    public DbSet<Job> Jobs => Set<Job>();

    public DbSet<MasterResume> MasterResumes => Set<MasterResume>();
}
using Microsoft.EntityFrameworkCore;

using WildGooseChase.Models;
using WildGooseChaseResumeApi.Services;
using WildGooseChase.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendDev", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});



builder.Services.AddSingleton<ResumeDslParser>();
builder.Services.AddSingleton<ResumeCompilerService>();

var app = builder.Build();

app.MapGet("/api/test-db", async (AppDbContext db) =>
{
    var jobCount = await db.Jobs.CountAsync();

    return Results.Ok(new
    {
        connected = true,
        jobs = jobCount
    });
});


app.UseCors("FrontendDev");

app.MapPost("/api/resume/compile", async (
    CompileRequestDto request,
    ResumeDslParser parser,
    ResumeCompilerService compiler,
    CancellationToken cancellationToken) =>
{
    if (string.IsNullOrWhiteSpace(request.DslText))
    {
        return Results.BadRequest(new { error = "dslText is required." });
    }

    string latexBody;
    try
    {
        latexBody = parser.Parse(request.DslText);
    }
    catch (FormatException ex)
    {
        return Results.BadRequest(new { error = "DSL parse error.", detail = ex.Message });
    }

    try
    {
        var pdfBytes = await compiler.CompileToPdfAsync(latexBody, cancellationToken);
        return Results.File(pdfBytes, "application/pdf");
    }
    catch (LatexCompileException ex)
    {
        return Results.BadRequest(new { error = ex.Message, log = ex.CompilerLog });
    }
})
.RequireCors("FrontendDev");

app.Run();
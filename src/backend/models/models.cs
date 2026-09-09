namespace WildGooseChase.Models;

public record CompileRequestDto(string? DslText);

public record Job
{
    public string Id { get; set; } = "";
    public string? Title { get; set; } = "";
    public string? Employer { get; set; } = "";
    public string? WorkTerm { get; set; } = "";
    public string? JobType { get; set; } = "";
    public string? EmployerJobNumber { get; set; } = "";
    public int? Openings { get; set; } = 0;
    public string[]? Levels { get; set; } = [];
    public string? Region { get; set; } = "";
    public string? Province { get; set; } = "";
    public string? PostalCode { get; set; } = "";
    public string? Country { get; set; } = "";
    public string? LocationArrangement { get; set; } = "";
    public string? Duration { get; set; } = "";
    public string? Compensation { get; set; } = "";
    public string? Summary { get; set; } = "";
    public string? Responsibilities { get; set; } = "";
    public string? RequiredSkills { get; set; } = "";
    public bool? Saved { get; set; } = false;
}
public record Resume {

    public string Id { get; set; } = "";

    public string? Name { get; set; } = "";

    public string? DslText { get; set; } = "";

    
};

public record MasterResume
{
    public string Id { get; set; } = "";

    public string? Text { get; set; } = "";
}


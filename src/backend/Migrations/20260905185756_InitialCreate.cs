using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WildGooseChase.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Jobs",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Employer = table.Column<string>(type: "text", nullable: true),
                    WorkTerm = table.Column<string>(type: "text", nullable: true),
                    JobType = table.Column<string>(type: "text", nullable: true),
                    EmployerJobNumber = table.Column<string>(type: "text", nullable: true),
                    Openings = table.Column<int>(type: "integer", nullable: true),
                    Levels = table.Column<string[]>(type: "text[]", nullable: true),
                    Region = table.Column<string>(type: "text", nullable: true),
                    Province = table.Column<string>(type: "text", nullable: true),
                    PostalCode = table.Column<string>(type: "text", nullable: true),
                    Country = table.Column<string>(type: "text", nullable: true),
                    LocationArrangement = table.Column<string>(type: "text", nullable: true),
                    Duration = table.Column<string>(type: "text", nullable: true),
                    Compensation = table.Column<string>(type: "text", nullable: true),
                    Summary = table.Column<string>(type: "text", nullable: true),
                    Responsibilities = table.Column<string>(type: "text", nullable: true),
                    RequiredSkills = table.Column<string>(type: "text", nullable: true),
                    Saved = table.Column<bool>(type: "boolean", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jobs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MasterResumes",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Text = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MasterResumes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Resumes",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    DslText = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resumes", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Jobs");

            migrationBuilder.DropTable(
                name: "MasterResumes");

            migrationBuilder.DropTable(
                name: "Resumes");
        }
    }
}

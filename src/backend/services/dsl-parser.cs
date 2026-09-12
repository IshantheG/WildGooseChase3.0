using System.Text;
using System.Text.RegularExpressions;

namespace WildGooseChaseResumeApi.Services;

public class ResumeDslParser
{
    private enum Mode
    {
        None,
        SubheadingList, 
        ItemList,       
        SkillsBlock   
    }

    public string Parse(string dslText)
    {
        var sb = new StringBuilder();
        var mode = Mode.None;

        var lines = dslText.Replace("\r\n", "\n").Split('\n');

        foreach (var rawLine in lines)
        {
            var line = rawLine.TrimEnd();
            if (string.IsNullOrWhiteSpace(line))
            {
                continue;
            }

            if (line.StartsWith("### "))
{
    CloseItemListIfOpen(sb, ref mode);
    CloseSkillsBlockIfOpen(sb, ref mode);

    if (mode != Mode.SubheadingList)
    {
        sb.AppendLine(@"\resumeSubHeadingListStart");
        mode = Mode.SubheadingList;
    }

    EmitProjectHeading(sb, line[4..]);
}
else if (line.StartsWith("## "))
{
    CloseItemListIfOpen(sb, ref mode);
    CloseSkillsBlockIfOpen(sb, ref mode);

    if (mode != Mode.SubheadingList)
    {
        sb.AppendLine(@"\resumeSubHeadingListStart");
        mode = Mode.SubheadingList;
    }

    EmitSubheading(sb, line[3..]);
}
            else if (line.StartsWith("# "))
            {
                CloseAllOpenBlocks(sb, ref mode);
                sb.AppendLine($@"\section{{{EscapeWithFormatting(line[2..].Trim())}}}");
                mode = Mode.None;
            }
            else if (line.StartsWith("** "))
            {
                CloseItemListIfOpen(sb, ref mode);
                if (mode != Mode.SkillsBlock)
                {
                    sb.AppendLine(@"\begin{itemize}[leftmargin=0.15in, label={}]");
                    sb.AppendLine(@"\small{\item{");
                    mode = Mode.SkillsBlock;
                }
                EmitSkillLine(sb, line[3..]);
            }
            else if (line.StartsWith("- "))
{
    if (mode == Mode.SkillsBlock)
    {
        throw new FormatException(
            $"Bullet ('- ') found inside a skills block ('** '). Start a new " +
            $"'#' or '##' line before using bullets again: \"{line}\"");
    }

    if (mode != Mode.ItemList)
    {
        sb.AppendLine(@"\resumeItemListStart");
        mode = Mode.ItemList;
    }
    sb.AppendLine($@"\resumeItem{{{EscapeWithFormatting(line[2..].Trim())}}}");
}
            else
            {
                throw new FormatException(
                    $"Line doesn't match any known DSL marker (#, ##, ###, **, -): \"{line}\"");
            }
        }

        CloseAllOpenBlocks(sb, ref mode);
        return sb.ToString();
    }

    private static readonly Regex BoldPattern = new(@"\*\*(.+?)\*\*", RegexOptions.Compiled);


private static string EscapeWithFormatting(string text)

{
    text ??= string.Empty;
    
    var sb = new StringBuilder();
    int lastIndex = 0;

    foreach (Match match in BoldPattern.Matches(text))
    {
        sb.Append(Escape(text[lastIndex..match.Index]));
        sb.Append(@"\textbf{").Append(Escape(match.Groups[1].Value)).Append('}');
        lastIndex = match.Index + match.Length;
    }
    sb.Append(Escape(text[lastIndex..]));

    return sb.ToString();
}

    private static void EmitSubheading(StringBuilder sb, string content)
    {
       
        var parts = SplitFields(content, maxCount: 4, minCount: 1, markerForError: "##");
        sb.AppendLine($@"\resumeSubheading{{{EscapeWithFormatting(parts[0])}}}{{{EscapeWithFormatting(parts[1])}}}{{{EscapeWithFormatting(parts[2])}}}{{{EscapeWithFormatting(parts[3])}}}");}

    private static void EmitProjectHeading(StringBuilder sb, string content)
    {
        var parts = SplitFields(content, maxCount: 3, minCount: 1, markerForError: "###");
        var left = $@"\textbf{{{EscapeWithFormatting(parts[0])}}} $|$ \emph{{{EscapeWithFormatting(parts[1])}}}";
        sb.AppendLine($@"\resumeProjectHeading{{{left}}}{{{EscapeWithFormatting(parts[2])}}}");
    }

    private static void EmitSkillLine(StringBuilder sb, string content)
    {
        var idx = content.IndexOf(':');
        if (idx < 0)
        {
            throw new FormatException(
                $"Skills line must be 'Category: item, item' (missing ':'): \"** {content}\"");
        }
        var category = content[..idx].Trim();
        var items = content[(idx + 1)..].Trim();
        sb.AppendLine($@"\textbf{{{EscapeWithFormatting(category)}}}{{: {EscapeWithFormatting(items)}}} \\");
    }

    
    private static string[] SplitFields(string content, int maxCount, int minCount, string markerForError)
    {
        var parts = content.Split('|');
        if (parts.Length > maxCount)
        {
            throw new FormatException(
                $"'{markerForError}' line allows at most {maxCount} fields separated by '|', " +
                $"got {parts.Length}: \"{content}\"");
        }
        if (parts.Length < minCount)
        {
            throw new FormatException(
                $"'{markerForError}' line needs at least {minCount} field(s), " +
                $"got {parts.Length}: \"{content}\"");
        }

        var result = new string[maxCount];
        for (int i = 0; i < maxCount; i++)
        {
            result[i] = i < parts.Length ? parts[i].Trim() : "";
        }
        return result;
    }

    private static void CloseItemListIfOpen(StringBuilder sb, ref Mode mode)
    {
        if (mode == Mode.ItemList)
        {
            sb.AppendLine(@"\resumeItemListEnd");
            mode = Mode.SubheadingList;
        }
    }

    private static void CloseSkillsBlockIfOpen(StringBuilder sb, ref Mode mode)
    {
        if (mode == Mode.SkillsBlock)
        {
            sb.AppendLine("}}");
            sb.AppendLine(@"\end{itemize}");
            mode = Mode.None;
        }
    }

    private static void CloseAllOpenBlocks(StringBuilder sb, ref Mode mode)
    {
        CloseItemListIfOpen(sb, ref mode);
        CloseSkillsBlockIfOpen(sb, ref mode);
        if (mode == Mode.SubheadingList)
        {
            sb.AppendLine(@"\resumeSubHeadingListEnd");
            mode = Mode.None;
        }
    }

    private static string Escape(string text)
    {
        var sb = new StringBuilder();
        foreach (var c in text)
        {
            switch (c)
            {
                case '&': sb.Append(@"\&"); break;
                case '%': sb.Append(@"\%"); break;
                case '$': sb.Append(@"\$"); break;
                case '#': sb.Append(@"\#"); break;
                case '_': sb.Append(@"\_"); break;
                case '{': sb.Append(@"\{"); break;
                case '}': sb.Append(@"\}"); break;
                case '~': sb.Append(@"\textasciitilde{}"); break;
                case '^': sb.Append(@"\textasciicircum{}"); break;
                case '\\': sb.Append(@"\textbackslash{}"); break;
                default: sb.Append(c); break;
            }
        }
        return sb.ToString();
    }
}
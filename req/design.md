# DESIGN.md

# Stock Analysis Platform — UI/UX Design Specification

## 1. Design Objective

Design a **simple, clean, modern, aesthetic, responsive and user-friendly Stock Analysis Platform**.

The interface should make complex stock-analysis information easy to understand without making the application look overcrowded or overly technical.

The design should feel like a **professional financial analysis product**, while remaining approachable for normal users.

---

# 2. PRIMARY DESIGN REFERENCES

Two reference images are provided with the project.

Use the images as the **primary visual reference** for:

- Overall visual language
- Layout quality
- Card structure
- Spacing
- Typography hierarchy
- Navigation
- Financial data presentation
- Tables
- Score displays
- Analysis sections
- Responsive behavior
- Desktop/mobile adaptation
- General visual aesthetics

The reference images are available in the project's image folder / provided reference images.

## IMPORTANT

The reference images are **NOT strict pixel-perfect templates**.

Do NOT blindly copy the exact:

- Screen layout
- Card dimensions
- Number of cards
- Spacing
- Component positions
- Navigation arrangement
- Content density
- Exact typography sizes
- Exact visual proportions

Instead:

> Use the references as the **design language and visual direction** for the application.

If a reference layout creates a UX problem, responsiveness issue, content overflow, excessive complexity, or inconsistency with the approved application flow, **adapt the design intelligently**.

The final design should prioritize:

1. Usability
2. Responsiveness
3. Readability
4. Visual hierarchy
5. Accessibility
6. Consistency
7. Aesthetic quality

over copying the reference images exactly.

---

# 3. DESIGN STYLE

The overall visual style should be:

- Modern
- Minimal
- Professional
- Clean
- Financial/analytical
- Spacious
- Information-focused
- Easy to scan
- Aesthetic without excessive decoration

Avoid making the application feel:

- Too corporate
- Too dense
- Too colorful
- Too flashy
- Too technical
- Too dark
- Too dashboard-heavy
- Visually noisy

The UI should communicate:

> "Professional financial analysis made easy to understand."

---

# 4. TWO VISUAL MODES

The design may support two visual themes inspired by the references:

## Light Theme

Primary characteristics:

- White / near-white page background
- White cards
- Subtle borders
- Very light shadows
- Dark navy/black typography
- Blue primary actions
- Green positive financial indicators
- Red negative indicators
- Light neutral backgrounds for tables and secondary sections

The light theme should be the **preferred/default visual direction** unless the application requirements specify otherwise.

---

## Dark Theme

The dark reference can be used as inspiration for an optional dark mode.

Characteristics:

- Deep navy / charcoal background
- Slightly lighter dark cards
- Subtle borders
- White/light typography
- Blue primary actions
- Green positive indicators
- Red negative indicators
- Muted secondary text

Do not make the dark theme excessively black.

Prefer:

```text
Deep Navy
↓
Dark Slate
↓
Card Surface
↓
Subtle Border

instead of pure black everywhere.

5. COLOR SYSTEM

Use a restrained financial-product color palette.

Primary

Use a professional blue for:

Primary buttons
Active navigation
Links
Selected tabs
Important interactive elements
Focus states

The exact shade may be adjusted by the developer to maintain accessibility and visual consistency.

Positive

Use green for:

Positive price movement
Positive percentage movement
Good score
Strong financial metric
Positive trend
Healthy status
Positive valuation signal

Green should not dominate the entire UI.

Use it primarily as a status indicator.

Negative

Use red for:

Negative price movement
Negative percentage movement
Poor score
Warning financial condition
Negative trend
Overvalued/negative valuation signal

Avoid large red backgrounds unless necessary.

Warning

Use amber/orange for:

Watch status
Caution
Moderate risk
Attention-required conditions
Neutral-to-negative indicators
Neutral

Use neutral gray/slate colors for:

Secondary text
Borders
Disabled states
Supporting information
Table separators
Background sections
6. COLOR USAGE RULE

Do not use colors only for decoration.

Colors should communicate meaning.

For example:

Green  → Positive / Healthy / Good
Red    → Negative / Risk / Poor
Amber  → Warning / Watch
Blue   → Primary action / Navigation / Information
Gray   → Secondary / Neutral

Maintain sufficient contrast between foreground and background.

7. TYPOGRAPHY

Typography should be:

Clean
Modern
Highly readable
Professional
Consistent

Prefer a modern sans-serif font family.

A suitable font stack may be:

Inter,
system-ui,
-apple-system,
BlinkMacSystemFont,
"Segoe UI",
sans-serif

Do not introduce unnecessary decorative fonts.

8. TYPOGRAPHY HIERARCHY

Maintain a clear hierarchy.

Page Title

Large and strong.

Example:

Stock Analysis
Section Heading

Medium/large and visually distinct.

Example:

Fundamental Analysis
Card Heading

Medium and semibold.

Example:

Business Health
Body Text

Comfortable reading size.

Supporting Text

Smaller and muted.

Financial Numbers

Important financial numbers should have:

Strong weight
Clear alignment
Adequate spacing
Appropriate formatting

Example:

₹3,186.45
+24.35 (+0.77%)
9. FINANCIAL NUMBER PRESENTATION

Financial numbers are one of the most important parts of the UI.

Always prioritize readability.

Examples:

₹3,186.45
₹3,01,234 Cr.
18.7%
48.2
8.5 / 10

Use consistent formatting throughout the application.

Do not randomly change:

Decimal precision
Currency formatting
Percentage formatting
Units
Number abbreviations
10. PAGE STRUCTURE

Use a clear page hierarchy:

Application Header
        ↓
Page Header
        ↓
Page Description / Context
        ↓
Primary Navigation / Tabs
        ↓
Main Content
        ↓
Secondary Information
        ↓
Footer

Do not force every screen to use exactly this structure.

If a particular analysis page benefits from a different structure, adapt it.

11. MAIN NAVIGATION

The application should have a clear primary navigation.

The navigation should include the major modules defined by the approved application flow.

At minimum, the main navigation should provide access to:

Dashboard / Home
Stock Analysis
Sector Analysis
Watchlist where required
Other approved modules from APPFLOW.md

Do not add modules that are not supported by the approved requirements.

12. DESKTOP NAVIGATION

For desktop screens, use either:

A clean top navigation
A compact sidebar
Or another layout that provides better usability

The reference images show both approaches.

The implementation should choose the option that best fits the final application.

The navigation must:

Clearly indicate the active page.
Be easy to scan.
Avoid excessive menu items.
Maintain consistent spacing.
Avoid visual clutter.
13. MOBILE NAVIGATION

Do not shrink the desktop navigation until it becomes unusable.

On smaller screens:

Use a compact navigation solution.
Use a menu/drawer when necessary.
Keep important modules accessible.
Avoid horizontal overflow.
Keep touch targets comfortable.

The mobile reference image should be treated as inspiration for responsive behavior, not as a strict implementation.

14. STOCK ANALYSIS HEADER

The stock analysis screen should clearly identify the selected company.

The header may contain:

Company Name
Ticker / Symbol
Current Price
Price Change
Percentage Change
Sector
Market Capitalization

Additional actions may include:

Add to Watchlist
Download Report
Other approved actions

Do not overcrowd the header.

If the available screen width is limited, reorganize the information intelligently.

15. COMPANY DESCRIPTION

Every relevant company analysis screen should provide a short company description where required by the source requirements.

The description should help the user quickly understand:

What the company does
Main business/activity
Major products/services where relevant
Basic business context

Keep the initial description concise.

Do not create huge paragraphs inside the primary dashboard.

If additional information is required, provide it in a separate section or expandable area.

16. COMPANY OVERVIEW

The company overview should provide a quick understanding of the stock.

Possible information includes only the data supported by the approved requirements:

Company name
Symbol
Current price
Price change
Market capitalization
Sector
Short description
Relevant financial metrics

Use cards or compact information blocks.

Avoid presenting every available metric at once.

17. CARD DESIGN

Cards are an important part of the visual language.

Cards should have:

Subtle border
Small/medium border radius
Comfortable internal padding
Clear heading
Strong information hierarchy
Minimal shadow
Consistent spacing

Do not overuse cards.

A card should exist because it improves information grouping.

18. CARD DENSITY

Avoid excessive dashboard density.

Bad:

20 small cards
+
multiple tables
+
multiple charts
+
large navigation
+
multiple actions

Preferred:

Important information
        ↓
Clear grouping
        ↓
Progressive disclosure
        ↓
Detailed information when needed

Users should immediately understand what is important.

19. ANALYSIS TABS

Analysis modules may use tabs/sub-navigation for related sections.

Examples based on the approved application structure may include:

Overview
Business
Sector
Fundamentals
Business Model
MOAT
Valuation
Entry / Exit
Portfolio
Psychology
Risk

Do not add tabs merely because they appear in the reference.

Only implement tabs supported by APPFLOW.md and the approved requirements.

If there are too many tabs for the available width:

Collapse them.
Use horizontal scrolling carefully.
Group related sections.
Use a dropdown/menu where appropriate.

Never allow tabs to overflow or overlap.

20. TABLE DESIGN

Tables should be clean and easy to scan.

Use:

Clear column headers
Adequate row height
Consistent alignment
Subtle separators
Highlighting only where meaningful
Responsive handling

Financial numbers should generally be aligned consistently.

Avoid excessively dense tables.

21. RESPONSIVE TABLES

Tables must not cause page-wide horizontal overflow.

On smaller screens, choose the most appropriate solution:

Horizontal table scrolling
Reduced columns
Priority columns
Stacked information
Responsive cards
Alternative mobile presentation

Do not force a desktop table onto a mobile screen if it becomes difficult to use.

22. SCORE COMPONENTS

Stock scores should be visually prominent but not overwhelming.

Possible presentation:

8.5 / 10
Excellent

or:

Business Health
8.5 / 10

Use:

Circular score indicators
Progress bars
Score badges
Compact score cards

depending on context.

Use consistent score semantics throughout the platform.

23. SCORE COLOR LOGIC

Use status colors carefully.

Example:

Excellent → Green
Good      → Green / Blue
Watch     → Amber
Avoid     → Red

The exact thresholds must come from the approved requirements.

Do not invent scoring rules inside the UI.

24. FINANCIAL METRIC GROUPS

Related metrics should be grouped together.

Example:

ROE
ROCE
OPM
P/E
PEG
P/B
Debt/Equity

Use compact metric blocks when appropriate.

Avoid making every metric look like a separate large dashboard card.

25. BUSINESS ANALYSIS SCREEN

The Business Analysis screen should prioritize understanding the company.

Recommended structure:

Company Header
        ↓
Short Company Description
        ↓
What the Business Does
        ↓
Products / Services
        ↓
Customers
        ↓
Problem Solved
        ↓
How the Business Makes Money
        ↓
Business Type

Only include sections supported by the project requirements.

Use simple visual grouping.

26. SECTOR ANALYSIS SCREEN

Sector Analysis is a main application module and should be accessible through the main navigation.

The screen should make it easy to understand:

Sector
Sector classification
Relevant market context
Peer comparison
Relevant sector metrics
Other approved sector information

Possible layout:

Sector Header
        ↓
Sector Classification
        ↓
Sector Overview
        ↓
Market Context
        ↓
Peer Comparison
        ↓
Relevant Metrics

Do not overcrowd the page.

27. FUNDAMENTAL ANALYSIS SCREEN

Fundamental analysis should emphasize:

Financial metrics
Scores
Trends
Comparison
Explanations

Use tables for detailed data.

Use cards for summaries.

Use visual indicators for scores.

The screen should allow users to understand the result without reading every table row.

28. DEEP FUNDAMENTAL ANALYSIS

For detailed fundamental information:

Use a hierarchy such as:

Summary
↓
Key Metrics
↓
Quarterly Trends
↓
Annual Trends
↓
P&L
↓
Balance Sheet
↓
Cash Flow
↓
Ratios
↓
Shareholding

The exact sections must follow the approved project requirements.

Do not put all information into a single massive screen.

Use sections, tabs, collapsible groups, or progressive disclosure where useful.

29. VALUATION SCREEN

Valuation information should be presented clearly.

Examples of presentation:

P/E
Company P/E
Industry P/E
Fair P/E
PEG
P/E
Earnings Growth
PEG
Margin of Safety
Fair Value
Current Price
MOS

Important valuation conclusions should be visually distinguishable.

Do not rely only on color to communicate the result.

30. CHARTS

Charts should be:

Simple
Clean
Easy to interpret
Properly labeled
Responsive

Avoid unnecessary decorative charts.

Only visualize information where a chart improves understanding.

If a table communicates the information better, use a table.

31. DASHBOARD

The dashboard should provide a quick overview rather than displaying every analysis detail.

Potential areas:

Market Overview
        ↓
Watchlist
        ↓
Recent Analysis
        ↓
Top Scores
        ↓
Analysis Summary

The exact dashboard content must follow the approved requirements.

Prioritize the most useful information.

32. EMPTY STATES

Every major data-driven component should have a meaningful empty state.

Example:

No stock selected

Search for a company to begin analysis.

Do not leave blank white cards.

33. LOADING STATES

Loading states must feel intentional.

Use:

Skeleton loaders
Subtle progress indicators
Loading text where appropriate

Avoid freezing the entire interface unnecessarily.

34. ERROR STATES

Errors must be user-friendly.

Do not expose technical errors such as:

TypeError
undefined is not an object
500 Internal Server Error

to normal users.

Instead provide:

Unable to load this information.

Please try again.

Technical details may be logged separately.

35. RESPONSIVENESS — CRITICAL REQUIREMENT

The application must be responsive.

Do not design desktop first and simply shrink everything.

Design intentionally for:

Large Desktop
↓
Desktop
↓
Laptop
↓
Tablet
↓
Mobile
↓
Small Mobile
36. RESPONSIVE RULES

The interface must never have:

Horizontal page overflow
Overlapping cards
Text cutoffs
Broken tables
Broken navigation
Buttons outside the viewport
Cards squeezed to unreadable sizes
Charts extending outside containers
Navigation overlapping content
Excessive empty space
Tiny unreadable text
37. RESPONSIVE LAYOUT BEHAVIOR

Desktop:

Multi-column layouts
        ↓
Cards beside each other
        ↓
Detailed analysis visible

Tablet:

Reduced columns
        ↓
Cards reorganized
        ↓
Tables adapted

Mobile:

Single-column priority layout
        ↓
Important information first
        ↓
Secondary information below
        ↓
Detailed sections expandable/scrollable where necessary
38. MOBILE-FIRST USABILITY

On mobile:

Prioritize key metrics.
Keep company identity visible.
Keep navigation accessible.
Make buttons touch-friendly.
Avoid tiny controls.
Avoid excessive card nesting.
Keep important actions easy to reach.
Allow long data to scroll appropriately.
Never force users to zoom.
39. SPACING

Use a consistent spacing system.

Prefer a predictable scale such as:

4px
8px
12px
16px
20px
24px
32px
40px
48px

Do not use arbitrary spacing values throughout the application.

Spacing should create visual hierarchy.

40. BORDER RADIUS

Use consistent rounded corners.

Suggested approach:

Small controls → small radius
Cards → medium radius
Large containers → medium radius
Buttons → medium radius

Avoid extremely rounded/pill-shaped UI unless it communicates a specific state.

41. SHADOWS

Use shadows subtly.

Preferred:

Very subtle shadow
+
Light border

Avoid:

Strong floating shadows
Excessive depth
Heavy glow effects

The interface should feel clean rather than flashy.

42. ICONS

Use a consistent icon library/style.

Icons should:

Have consistent size.
Have consistent stroke weight.
Support the meaning of the UI.
Never replace important text when the meaning is unclear.

Do not mix multiple unrelated icon styles.

43. BUTTONS

Primary button:

Strong blue
High contrast
Clear label

Secondary button:

Outline or neutral style

Danger button:

Red only when destructive action is involved

Avoid having too many visually dominant buttons in one section.

44. INTERACTION DESIGN

Interactions should feel predictable.

Use:

Hover states
Focus states
Active states
Selected states
Disabled states
Loading states

Interactive elements must visually communicate their current state.

45. ACCESSIBILITY

The interface should maintain:

Good color contrast
Keyboard accessibility
Visible focus states
Readable text
Clear labels
Accessible buttons
Accessible form controls
Meaningful error messages

Do not rely exclusively on color to communicate status.

Example:

Instead of:

GREEN

use:

✓ Good
46. CONTENT DENSITY

The application deals with financial data, so information density is necessary.

However:

Information density must not become information overload.

Use:

Clear grouping
Progressive disclosure
Tabs
Sections
Collapsible areas
Summary → Detail hierarchy

when appropriate.

47. DESIGN CONSISTENCY

All screens should feel like part of the same application.

Maintain consistency for:

Header
Navigation
Buttons
Cards
Tables
Typography
Spacing
Colors
Status indicators
Score displays
Page widths
Responsive behavior
48. DO NOT OVER-DESIGN

Avoid unnecessary:

Gradients
Animations
Glowing effects
3D cards
Decorative illustrations
Excessive colors
Excessive borders
Excessive shadows
Unnecessary charts
Unnecessary badges

The application should feel premium through simplicity.

49. ANIMATION

Animations should be subtle and purposeful.

Use animation for:

Page transitions where appropriate
Loading
Expanding/collapsing
Hover feedback
Score transitions

Avoid:

Constant movement
Large animations
Distracting transitions
Slow interactions

Users should feel that the application is fast.

50. PERFORMANCE-AWARE DESIGN

The UI should remain responsive even when displaying:

Large tables
Multiple metrics
Charts
Long company descriptions
Large analysis sections

Avoid unnecessary rendering complexity.

51. DATA-DRIVEN UI SAFETY

The UI must remain visually stable when data is:

Missing
Delayed
Longer than expected
Shorter than expected
Negative
Zero
Extremely large
Extremely small

Do not assume every value will always be available.

This is especially important because the frontend will later receive data through Python APIs.

52. FUTURE BACKEND COMPATIBILITY

Current development is focused on the React frontend.

The backend will be added in the future using Python APIs for data integration.

Therefore:

Keep UI components reusable.
Avoid tightly coupling UI to static data.
Separate presentation from data logic where practical.
Design loading states.
Design error states.
Design empty states.
Keep future API integration in mind.

Do not implement the Python backend during the current frontend phase unless explicitly requested.

53. FUTURE AI

AI functionality is planned for a future stage.

Do not currently add:

AI chatbot
AI stock prediction
AI recommendations
AI-generated analysis
AI sentiment analysis
AI assistant

unless explicitly requested later.

The UI should not reserve large areas for AI functionality unless the approved requirements require it.

54. REFERENCE IMAGE FLEXIBILITY RULE

The two reference images are a visual starting point, not a fixed specification.

When implementing a screen, ask:

Does the layout match the application's purpose?
Is the information easy to understand?
Is the screen responsive?
Is the content readable?
Does the layout avoid unnecessary clutter?
Does it follow APPFLOW.md?
Does it follow the requirements in the source documents?
Does it behave correctly with missing/long data?

If the answer requires changing the reference layout, change it.

For example:

If a desktop card layout becomes crowded on mobile:

DO NOT:
Force the desktop layout onto mobile.

DO:
Reorganize it into a mobile-friendly layout.

If too many tabs exist:

DO NOT:
Allow tabs to overlap.

DO:
Use scrolling, grouping, dropdowns, or another clean navigation solution.

If a table becomes too wide:

DO NOT:
Break the entire page layout.

DO:
Adapt the table for the smaller viewport.
55. DESIGN DECISION PRIORITY

When different requirements conflict, use this priority:

1. Approved project requirements
        ↓
2. APPFLOW.md
        ↓
3. Functional usability
        ↓
4. Responsive behavior
        ↓
5. Accessibility
        ↓
6. DESIGN.md principles
        ↓
7. Reference images

The reference images should never override actual application requirements.

56. DEVELOPER DESIGN FREEDOM

The developer/designer has permission to make reasonable design decisions when the reference images do not cover a particular screen or situation.

The developer may:

Rearrange sections
Resize cards
Change grid structure
Adapt navigation
Change spacing
Change component placement
Choose a better responsive pattern
Simplify complex layouts
Introduce a suitable component pattern

provided that the result:

Matches the overall design language.
Does not contradict the requirements.
Does not introduce unsupported functionality.
Improves usability.
Remains responsive.
Remains visually consistent.
57. FINAL DESIGN PRINCIPLE

The final product should feel like:

A simple, aesthetic, professional stock-analysis platform that makes complex financial information easy to understand.

Do not optimize for copying the reference screenshots.

Optimize for:

Simple
+
Beautiful
+
Readable
+
Responsive
+
Professional
+
Consistent
+
User-Friendly

The two reference images establish the visual direction.

The final implementation should use them as inspiration while intelligently adapting every screen to its actual content and purpose.
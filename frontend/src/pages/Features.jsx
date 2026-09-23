import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  CheckCircle2,
  FlaskConical,
  FolderKanban,
  GraduationCap,
  Lightbulb,
  Network,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, Button } from "../components/ui";

const features = [
  [Target, "Student Skill Mapping", "Discover strengths, identify gaps, and understand the skills industry is looking for.", "primary"],
  [Brain, "AI Smart Matching", "Get internship recommendations using skills, career goals, location, and experience.", "violet"],
  [BriefcaseBusiness, "Internships & Placement", "Discover opportunities, apply, and follow your application progress in one place.", "success"],
  [BookOpen, "Learning Recommendations", "Turn skill gaps into practical learning topics, courses, projects, and certifications.", "warning"],
  [Award, "Digital Portfolio", "Showcase your skills, certifications, experience, projects, and assessment results.", "primary"],
  [BarChart3, "Faculty Industry Insights", "Understand industry skill demand and emerging competency requirements.", "violet"],
  [FolderKanban, "Projects & Collaboration", "Connect students, faculty, researchers, and industry through meaningful projects.", "success"],
  [Network, "Public Portfolio", "Share a professional portfolio with industry partners and collaborators.", "warning"],
];

const tone = {
  primary: "bg-primary-light text-primary",
  violet: "bg-violet/10 text-violet",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
};

function Features() {
  return (
    <div className="min-h-screen bg-page text-heading">
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary-light via-page to-violet/10">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-violet/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-primary shadow-soft">
              <Sparkles className="h-4 w-4" />
              Academia • Industry • Innovation
            </div>

            <h1 className="mt-7 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Everything you need to connect
              <span className="block bg-gradient-to-r from-primary to-violet bg-clip-text text-transparent">
                skills with opportunities
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-body sm:text-lg">
              AcademiaLink brings students, faculty, researchers, and industry together through skill mapping, learning, projects, internships, and intelligent matching.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link to="/register">
                <Button size="lg" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                  Get Started
                </Button>
              </Link>
              <Link to="/projects">
                <Button variant="secondary" size="lg">Explore Projects</Button>
              </Link>
            </div>
          </div>

          <div className="glass mx-auto mt-14 max-w-5xl rounded-xl p-4 shadow-card sm:p-6">
            <div className="rounded-xl bg-gradient-to-br from-primary to-violet p-5 text-white sm:p-8">
              <div className="grid gap-5 sm:grid-cols-4">
                {[
                  [Target, "Assess Skills"],
                  [Brain, "Find Gaps"],
                  [BookOpen, "Learn"],
                  [BriefcaseBusiness, "Get Opportunities"],
                ].map(([Icon, label]) => (
                  <div key={label} className="rounded-lg border border-white/20 bg-white/10 p-5 backdrop-blur-md">
                    <Icon className="h-7 w-7" />
                    <p className="mt-4 text-base font-bold">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-primary">Platform capabilities</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">One platform. Multiple possibilities.</h2>
          <p className="mt-4 leading-7 text-body">Every module is connected so that assessment results can lead to learning, matching, applications, and career growth.</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(([Icon, title, description, color]) => (
            <Card key={title} hover className="group h-full p-6">
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${tone[color]}`}>
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-body">{description}</p>
              <div className="mt-5 flex items-center gap-1 text-sm font-bold text-primary opacity-0 transition group-hover:opacity-100">
                Explore <ArrowRight className="h-4 w-4" />
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-surface-soft px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-primary">Connected journey</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">From skill assessment to opportunity</h2>
            <p className="mt-4 leading-7 text-body">The platform connects the major steps of academic and professional growth.</p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {[
              ["01", Target, "Assess", "Measure current skills"],
              ["02", Network, "Identify", "Find skill gaps"],
              ["03", BookOpen, "Learn", "Build knowledge"],
              ["04", Brain, "Match", "Find opportunities"],
              ["05", BriefcaseBusiness, "Apply", "Track applications"],
              ["06", Award, "Grow", "Build your career"],
            ].map(([number, Icon, title, text]) => (
              <div key={number} className="relative rounded-xl border border-border bg-surface p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-card">
                <span className="absolute right-4 top-4 text-xs font-bold text-muted">{number}</span>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-light text-primary"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-5 font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-5 text-body">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-light text-primary"><Network className="h-7 w-7" /></div>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.15em] text-primary">Connected ecosystem</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Bring academia and industry together</h2>
            <p className="mt-5 max-w-xl leading-7 text-body">Students, faculty, researchers, and industry can use the same ecosystem to discover skills, requirements, projects, and opportunities.</p>
            <div className="mt-7 space-y-3">
              {[
                "Connect academic skills with industry requirements",
                "Discover internships and practical opportunities",
                "Support faculty with industry skill insights",
                "Build professional portfolios and connections",
              ].map((item) => <div key={item} className="flex items-center gap-3 text-sm font-semibold"><CheckCircle2 className="h-5 w-5 shrink-0 text-success" />{item}</div>)}
            </div>
          </div>

          <Card className="grid gap-4 p-6 sm:grid-cols-2">
            <Ecosystem icon={<GraduationCap />} title="Students" text="Skills, learning, projects and internships" color="primary" />
            <Ecosystem icon={<Users />} title="Faculty" text="Industry insights and collaboration" color="violet" />
            <Ecosystem icon={<FlaskConical />} title="Researchers" text="Research and knowledge collaboration" color="warning" />
            <Ecosystem icon={<BriefcaseBusiness />} title="Industry" text="Talent, projects and opportunities" color="success" />
          </Card>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-xl bg-gradient-to-br from-primary to-violet p-8 text-center text-white shadow-purple sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15"><Lightbulb className="h-7 w-7" /></div>
          <h2 className="mt-6 text-3xl font-bold sm:text-4xl">Ready to connect skills with opportunities?</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/80">Start your AcademiaLink journey and turn assessment insights into practical learning and career opportunities.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/register"><Button variant="white" size="lg">Create Account</Button></Link>
            <Link to="/about"><Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">Learn More</Button></Link>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
          <InfoCard icon={<ShieldCheck />} title="Secure" text="Authentication and protected platform access." />
          <InfoCard icon={<Brain />} title="Intelligent" text="Skill-based recommendations and matching." />
          <InfoCard icon={<Network />} title="Connected" text="A shared ecosystem for academia and industry." />
        </div>
      </section>
    </div>
  );
}

function Ecosystem({ icon, title, text, color }) {
  const classes = tone[color];
  return <div className="rounded-xl border border-border bg-surface p-5 transition hover:-translate-y-1 hover:shadow-soft"><div className={`flex h-11 w-11 items-center justify-center rounded-lg ${classes}`}>{icon}</div><h3 className="mt-4 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-body">{text}</p></div>;
}

function InfoCard({ icon, title, text }) {
  return <div className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5 shadow-soft"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">{icon}</div><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-body">{text}</p></div></div>;
}

export default Features;

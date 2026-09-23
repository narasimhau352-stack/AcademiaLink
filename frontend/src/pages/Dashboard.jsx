import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  Card,
  ProgressBar,
  Button,
} from "../components/ui";

function Dashboard() {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  return (
    <div className="min-h-screen space-y-7 bg-page p-4 sm:p-6 lg:p-8">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-violet p-7 text-white shadow-card sm:p-9">

        <div className="relative z-10 max-w-2xl">

          <p className="text-sm font-semibold text-white/80">
            AcademiaLink Dashboard
          </p>

          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Welcome back, {user?.name || "Student"}!
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/80">
            Continue building your skills, discover opportunities,
            and connect your academic journey with industry.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">

            <Link to="/skill-assessment">
              <Button
                variant="secondary"
                className="border-0 bg-white text-primary hover:bg-page"
              >
                <ClipboardCheck className="mr-2 h-4 w-4" />
                Take Assessment
              </Button>
            </Link>

            <Link to="/smart-recommendations">
              <Button
                variant="ai"
                className="border border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Smart Matches
              </Button>
            </Link>

          </div>
        </div>

        {/* Decorative circles */}

        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

        <div className="absolute -bottom-24 right-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

      </section>


      {/* =====================================================
          STATISTICS
      ====================================================== */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Skills */}

        <Card hover>

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-body">
                Skills Assessed
              </p>

              <h2 className="mt-2 font-display text-3xl font-bold text-heading">
                12
              </h2>

              <p className="mt-1 text-xs text-body">
                Across 4 domains
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Award className="h-5 w-5" />
            </div>

          </div>

          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-success">
            <TrendingUp className="h-3.5 w-3.5" />
            +2 this month
          </div>

        </Card>


        {/* Skill strength */}

        <Card hover>

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-body">
                Skill Strength
              </p>

              <h2 className="mt-2 font-display text-3xl font-bold text-heading">
                78%
              </h2>

              <p className="mt-1 text-xs text-body">
                Overall proficiency
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet/10 text-violet">
              <BarChart3 className="h-5 w-5" />
            </div>

          </div>

          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-success">
            <TrendingUp className="h-3.5 w-3.5" />
            +8% improvement
          </div>

        </Card>


        {/* Smart matches */}

        <Card hover>

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-body">
                Smart Matches
              </p>

              <h2 className="mt-2 font-display text-3xl font-bold text-heading">
                14
              </h2>

              <p className="mt-1 text-xs text-body">
                Opportunities found
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet/10 text-violet">
              <Sparkles className="h-5 w-5" />
            </div>

          </div>

          <div className="mt-4 text-xs font-semibold text-violet">
            AI-powered recommendations
          </div>

        </Card>


        {/* Applications */}

        <Card hover>

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-body">
                Applications
              </p>

              <h2 className="mt-2 font-display text-3xl font-bold text-heading">
                6
              </h2>

              <p className="mt-1 text-xs text-body">
                2 under review
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BriefcaseBusiness className="h-5 w-5" />
            </div>

          </div>

          <div className="mt-4 text-xs font-semibold text-primary">
            Track applications
          </div>

        </Card>

      </section>


      {/* =====================================================
          SKILL PROGRESS + PROFILE
      ====================================================== */}

      <section className="grid gap-6 xl:grid-cols-3">

        {/* Skill Progress */}

        <Card className="xl:col-span-2">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="font-display text-lg font-bold text-heading">
                Skill Progress
              </h2>

              <p className="mt-1 text-sm text-body">
                Your current skill development
              </p>

            </div>

            <Link
              to="/student-profile"
              className="text-sm font-semibold text-primary hover:text-primary-dark"
            >
              View Profile
            </Link>

          </div>


          <div className="mt-7 space-y-6">

            {[
              ["Python", 88],
              ["Machine Learning", 72],
              ["React", 65],
              ["SQL", 81],
            ].map(([skill, progress]) => (

              <div key={skill}>

                <div className="mb-2 flex justify-between text-sm">

                  <span className="font-semibold text-heading">
                    {skill}
                  </span>

                  <span className="font-semibold text-primary">
                    {progress}%
                  </span>

                </div>

                <ProgressBar progress={progress} />

              </div>

            ))}

          </div>

        </Card>


        {/* Profile Completion */}

        <Card>

          <div className="flex items-center justify-between">

            <h2 className="font-display text-lg font-bold text-heading">
              Profile
            </h2>

            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              78%
            </span>

          </div>


          <div className="mx-auto mt-7 flex h-36 w-36 items-center justify-center rounded-full bg-primary/10">

            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-card">

              <div className="text-center">

                <p className="font-display text-3xl font-bold text-primary">
                  78%
                </p>

                <p className="text-xs text-body">
                  Complete
                </p>

              </div>

            </div>

          </div>


          <p className="mt-6 text-center text-sm leading-6 text-body">
            Complete your profile to receive more relevant
            internship recommendations.
          </p>


          <Link
            to="/student-profile"
            className="mt-5 block"
          >

            <Button className="w-full">
              Complete Profile
            </Button>

          </Link>

        </Card>

      </section>


      {/* =====================================================
          RECOMMENDATIONS + RECENT ACTIVITY
      ====================================================== */}

      <section className="grid gap-6 lg:grid-cols-2">

        {/* Recommended Opportunities */}

        <Card>

          <div className="flex items-center justify-between">

            <div>

              <h2 className="font-display text-lg font-bold text-heading">
                Recommended Opportunities
              </h2>

              <p className="mt-1 text-sm text-body">
                Based on your current skills
              </p>

            </div>

            <Link
              to="/smart-recommendations"
              className="rounded-lg p-2 text-primary transition hover:bg-primary/10"
            >
              <ArrowRight className="h-5 w-5" />
            </Link>

          </div>


          <div className="mt-5 space-y-3">

            {[
              ["Frontend Developer Intern", "92%", "Hyderabad"],
              ["ML Research Intern", "86%", "Remote"],
              ["Data Analyst Intern", "81%", "Bengaluru"],
            ].map(([title, match, location]) => (

              <Link
                key={title}
                to="/smart-recommendations"
                className="flex items-center justify-between rounded-xl border border-border p-4 transition-all duration-200 hover:border-primary/30 hover:bg-page"
              >

                <div>

                  <p className="text-sm font-semibold text-heading">
                    {title}
                  </p>

                  <p className="mt-1 text-xs text-body">
                    {location}
                  </p>

                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-success">
                  {match} match
                </span>

              </Link>

            ))}

          </div>

        </Card>


        {/* Recent Activity */}

        <Card>

          <div className="flex items-center justify-between">

            <div>

              <h2 className="font-display text-lg font-bold text-heading">
                Recent Activity
              </h2>

              <p className="mt-1 text-sm text-body">
                Your latest updates
              </p>

            </div>

            <TrendingUp className="h-5 w-5 text-primary" />

          </div>


          <div className="mt-5 space-y-4">

            {[
              {
                icon: <CheckCircle2 className="h-4 w-4" />,
                text: "Skill assessment completed",
                time: "Today",
              },
              {
                icon: <BookOpen className="h-4 w-4" />,
                text: "Learning recommendation updated",
                time: "Yesterday",
              },
              {
                icon: <BriefcaseBusiness className="h-4 w-4" />,
                text: "Application submitted",
                time: "2 days ago",
              },
            ].map((item) => (

              <div
                key={item.text}
                className="flex items-center gap-3"
              >

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {item.icon}
                </div>

                <div className="flex-1">

                  <p className="text-sm font-medium text-heading">
                    {item.text}
                  </p>

                  <p className="text-xs text-body">
                    {item.time}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </Card>

      </section>


      {/* =====================================================
          QUICK ACTIONS
      ====================================================== */}

      <section>

        <h2 className="mb-4 font-display text-lg font-bold text-heading">
          Quick Actions
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <Link
            to="/skill-assessment"
            className="group"
          >

            <Card
              hover
              className="h-full"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ClipboardCheck className="h-5 w-5" />
              </div>

              <h3 className="mt-4 text-sm font-bold text-heading">
                Skill Assessment
              </h3>

              <p className="mt-1 text-xs leading-5 text-body">
                Evaluate your current technical skills.
              </p>

              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
                Start now
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>

            </Card>

          </Link>


          <Link
            to="/learning-recommendations"
            className="group"
          >

            <Card
              hover
              className="h-full"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet/10 text-violet">
                <BookOpen className="h-5 w-5" />
              </div>

              <h3 className="mt-4 text-sm font-bold text-heading">
                Learning
              </h3>

              <p className="mt-1 text-xs leading-5 text-body">
                Find resources to improve your skill gaps.
              </p>

              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-violet">
                Explore
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>

            </Card>

          </Link>


          <Link
            to="/smart-recommendations"
            className="group"
          >

            <Card
              hover
              className="h-full"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>

              <h3 className="mt-4 text-sm font-bold text-heading">
                Smart Matches
              </h3>

              <p className="mt-1 text-xs leading-5 text-body">
                Discover opportunities matched to your profile.
              </p>

              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
                View matches
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>

            </Card>

          </Link>


          <Link
            to="/internships"
            className="group"
          >

            <Card
              hover
              className="h-full"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-success">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>

              <h3 className="mt-4 text-sm font-bold text-heading">
                Internships
              </h3>

              <p className="mt-1 text-xs leading-5 text-body">
                Browse available industry opportunities.
              </p>

              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-success">
                Browse
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>

            </Card>

          </Link>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;
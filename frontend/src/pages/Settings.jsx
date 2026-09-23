import {
  Settings as SettingsIcon,
  Bell,
  User,
  Shield,
  ArrowLeft,
} from "lucide-react";

import { Link } from "react-router-dom";
import { Card } from "../components/ui";

function Settings() {
  return (
    <div className="min-h-screen bg-page p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-8 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <SettingsIcon className="h-6 w-6 text-primary" />
            </div>

            <div>
              <h1 className="font-display text-2xl font-bold text-heading">
                Settings
              </h1>

              <p className="mt-1 text-sm text-body">
                Manage your AcademiaLink preferences
              </p>
            </div>

          </div>

          <Link
            to="/dashboard"
            className="hidden items-center gap-2 rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-heading transition hover:bg-page md:flex"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

        </div>

        {/* SETTINGS */}

        <div className="grid gap-6 md:grid-cols-2">

          <Card hover>
            <div className="flex items-start gap-4">

              <div className="rounded-xl bg-primary/10 p-3">
                <User className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h2 className="font-semibold text-heading">
                  Account
                </h2>

                <p className="mt-1 text-sm leading-6 text-body">
                  Manage your profile and account information.
                </p>

                <Link
                  to="/student-profile"
                  className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
                >
                  Open Profile →
                </Link>
              </div>

            </div>
          </Card>

          <Card hover>
            <div className="flex items-start gap-4">

              <div className="rounded-xl bg-primary/10 p-3">
                <Bell className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h2 className="font-semibold text-heading">
                  Notifications
                </h2>

                <p className="mt-1 text-sm leading-6 text-body">
                  View and manage your AcademiaLink notifications.
                </p>
              </div>

            </div>
          </Card>

          <Card hover>
            <div className="flex items-start gap-4">

              <div className="rounded-xl bg-primary/10 p-3">
                <Shield className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h2 className="font-semibold text-heading">
                  Security
                </h2>

                <p className="mt-1 text-sm leading-6 text-body">
                  Your account is protected using authenticated access.
                </p>
              </div>

            </div>
          </Card>

        </div>

      </div>
    </div>
  );
}

export default Settings;
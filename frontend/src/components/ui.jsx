import React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle,
} from "lucide-react";

/* =========================================================
   CARD
========================================================= */

export const Card = ({
  children,
  className = "",
  hover = false,
  ...props
}) => {
  return (
    <div
      className={`
        rounded-md
        border border-border
        bg-surface
        p-6
        shadow-soft
        ${hover ? "card-hover cursor-pointer" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};


/* =========================================================
   STAT CARD
========================================================= */

export const StatCard = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  iconClass = "bg-primary-light text-primary",
  className = "",
}) => {
  return (
    <Card
      hover
      className={`relative overflow-hidden ${className}`}
    >
      <div className="flex items-start justify-between">

        <div className="min-w-0">

          <p className="text-sm font-medium text-body">
            {title}
          </p>

          <h3 className="mt-2 font-display text-3xl font-bold text-heading">
            {value}
          </h3>

          {subtitle && (
            <p className="mt-1 text-xs text-muted">
              {subtitle}
            </p>
          )}

        </div>

        {icon && (
          <div
            className={`
              flex h-11 w-11 shrink-0
              items-center justify-center
              rounded-xl
              ${iconClass}
            `}
          >
            {icon}
          </div>
        )}

      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-success">
          <span>{trend}</span>
        </div>
      )}

    </Card>
  );
};


/* =========================================================
   BUTTON
========================================================= */

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  className = "",
  type,
  disabled = false,
  ...props
}) => {

  const baseStyle = `
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-sm
    font-semibold
    transition-all
    duration-200
    focus:outline-none
    focus:ring-2
    focus:ring-primary/30
    disabled:pointer-events-none
    disabled:opacity-50
  `;

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-sm",
  };

  const variants = {

    /* Main purple button */
    primary: `
      bg-primary
      text-white
      shadow-soft
      hover:bg-primary-dark
      hover:-translate-y-[1px]
    `,

    /* White button */
    white: `
      bg-white
      text-primary
      border border-white
      hover:bg-primary-light
    `,

    /* Transparent / ghost */
    ghost: `
      bg-transparent
      text-primary
      border border-border
      hover:bg-primary-light
    `,

    /* Secondary */
    secondary: `
      bg-surface
      text-heading
      border border-border
      hover:bg-primary-light
      hover:border-primary/20
    `,

    /* AI / violet */
    ai: `
      bg-violet
      text-white
      hover:bg-violet/90
    `,

    /* Success */
    success: `
      bg-success
      text-white
      hover:opacity-90
    `,

    /* Danger */
    danger: `
      bg-danger
      text-white
      hover:opacity-90
    `,

    /* Outline */
    outline: `
      bg-transparent
      text-primary
      border border-primary
      hover:bg-primary-light
    `,
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        ${baseStyle}
        ${sizes[size] || sizes.md}
        ${variants[variant] || variants.primary}
        ${className}
      `}
      {...props}
    >

      {icon && iconPosition === "left" && (
        <span className="shrink-0">
          {icon}
        </span>
      )}

      <span>{children}</span>

      {icon && iconPosition === "right" && (
        <span className="shrink-0">
          {icon}
        </span>
      )}

    </button>
  );
};


/* =========================================================
   BADGE
========================================================= */

export const Badge = ({
  children,
  type = "neutral",
  className = "",
}) => {

  const styles = {

    success: `
      bg-green-50
      text-success
      border-green-100
    `,

    warning: `
      bg-amber-50
      text-warning
      border-amber-100
    `,

    danger: `
      bg-red-50
      text-danger
      border-red-100
    `,

    info: `
      bg-blue-50
      text-info
      border-blue-100
    `,

    purple: `
      bg-primary-light
      text-primary
      border-primary/10
    `,

    ai: `
      bg-violet-50
      text-violet
      border-violet/10
    `,

    neutral: `
      bg-gray-50
      text-body
      border-border
    `,
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-pill
        border
        px-3
        py-1
        text-xs
        font-semibold
        ${styles[type] || styles.neutral}
        ${className}
      `}
    >
      {children}
    </span>
  );
};


/* =========================================================
   SKILL CHIP
========================================================= */

export const SkillChip = ({
  skill,
  type = "verified",
  className = "",
}) => {

  const styles = {

    verified: `
      bg-green-50
      text-success
      border-green-100
    `,

    gap: `
      bg-amber-50
      text-warning
      border-amber-100
    `,

    neutral: `
      bg-primary-light
      text-body
      border-border
    `,

    ai: `
      bg-violet-50
      text-violet
      border-violet/10
    `,
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-pill
        border
        px-3
        py-1
        text-xs
        font-medium
        ${styles[type] || styles.neutral}
        ${className}
      `}
    >

      {type === "verified" && (
        <CheckCircle2 className="mr-1 h-3 w-3" />
      )}

      {type === "gap" && (
        <AlertTriangle className="mr-1 h-3 w-3" />
      )}

      {skill}

    </span>
  );
};


/* =========================================================
   PROGRESS BAR
========================================================= */

export const ProgressBar = ({
  progress = 0,
  color = "bg-primary",
  height = "h-2",
  showLabel = false,
  className = "",
}) => {

  const safeProgress = Math.min(
    100,
    Math.max(0, Number(progress) || 0)
  );

  return (
    <div className={`w-full ${className}`}>

      <div
        className={`
          w-full
          ${height}
          overflow-hidden
          rounded-pill
          bg-primary-light
        `}
      >

        <div
          className={`
            ${height}
            rounded-pill
            transition-all
            duration-500
            ${color}
          `}
          style={{
            width: `${safeProgress}%`,
          }}
        />

      </div>

      {showLabel && (
        <div className="mt-1 text-right text-xs font-semibold text-body">
          {safeProgress}%
        </div>
      )}

    </div>
  );
};


/* =========================================================
   STATUS MESSAGE
========================================================= */

export const StatusMessage = ({
  type = "info",
  title,
  message,
  className = "",
}) => {

  const styles = {

    success: {
      wrapper: "border-green-200 bg-green-50 text-success",
      icon: <CheckCircle2 className="h-5 w-5" />,
    },

    warning: {
      wrapper: "border-amber-200 bg-amber-50 text-warning",
      icon: <AlertTriangle className="h-5 w-5" />,
    },

    danger: {
      wrapper: "border-red-200 bg-red-50 text-danger",
      icon: <XCircle className="h-5 w-5" />,
    },

    info: {
      wrapper: "border-blue-200 bg-blue-50 text-info",
      icon: <Info className="h-5 w-5" />,
    },
  };

  const current = styles[type] || styles.info;

  return (
    <div
      className={`
        flex
        gap-3
        rounded-md
        border
        p-4
        ${current.wrapper}
        ${className}
      `}
    >

      <div className="shrink-0">
        {current.icon}
      </div>

      <div>

        {title && (
          <p className="text-sm font-semibold">
            {title}
          </p>
        )}

        {message && (
          <p className="mt-1 text-sm opacity-90">
            {message}
          </p>
        )}

      </div>

    </div>
  );
};


/* =========================================================
   EMPTY STATE
========================================================= */

export const EmptyState = ({
  icon,
  title = "Nothing here yet",
  description,
  action,
  className = "",
}) => {
  return (
    <div
      className={`
        flex
        flex-col
        items-center
        justify-center
        rounded-md
        border
        border-dashed
        border-border
        bg-surface-soft
        px-6
        py-12
        text-center
        ${className}
      `}
    >

      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
          {icon}
        </div>
      )}

      <h3 className="font-display text-lg font-bold text-heading">
        {title}
      </h3>

      {description && (
        <p className="mt-2 max-w-md text-sm leading-6 text-body">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}

    </div>
  );
};
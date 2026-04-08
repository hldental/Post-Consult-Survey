import { useMemo, useState } from "react";

const logoSrc = "/logo.jpg";
const brand = {
  name: "Huntline Dental Group",
  address: "1875 Highway 63, Westphalia, MO 65085",
  website: "https://huntlinedentalgroup.com",
  formspreeEndpoint: "https://formspree.io/f/xwvwzlbw",
};

const hurdleOptions = [
  "No objection / already scheduled",
  "Need to discuss with spouse",
  "Financially unsure",
  "Fear / anxiety",
  "Timing",
  "Seeking second opinion",
];

const followUpOptions = ["Call", "Text", "Email"];
const ratings = [1, 2, 3, 4, 5];
const totalSteps = 7;

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    schedulingExperience: 0,
    consultationExperience: 0,
    financialUnderstanding: 0,
    biggestHurdle: "",
    preferredFollowUp: "",
    likelyToMoveForward: "",
    stillHaveQuestions: "",
    feedback: "",
  });

  const completedSteps = useMemo(() => {
    let count = 0;
    if (formData.firstName && formData.lastName && formData.email) count += 1;
    if (formData.schedulingExperience > 0) count += 1;
    if (formData.consultationExperience > 0) count += 1;
    if (formData.financialUnderstanding > 0) count += 1;
    if (formData.biggestHurdle) count += 1;
    if (formData.preferredFollowUp) count += 1;
    if (formData.feedback || formData.likelyToMoveForward || formData.stillHaveQuestions) count += 1;
    return count;
  }, [formData]);

  const progressPercent = Math.round((completedSteps / totalSteps) * 100);

  function updateField(name, value) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      feedbackCategory: "post_consultation_survey",
      priorityLevel:
        formData.likelyToMoveForward === "Ready now"
          ? "high"
          : formData.stillHaveQuestions === "Yes"
            ? "medium"
            : "standard",
      _subject: `Post-consultation feedback - ${formData.firstName} ${formData.lastName}`,
    };

    try {
      const response = await fetch(brand.formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Submission failed");

      setSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        schedulingExperience: 0,
        consultationExperience: 0,
        financialUnderstanding: 0,
        biggestHurdle: "",
        preferredFollowUp: "",
        likelyToMoveForward: "",
        stillHaveQuestions: "",
        feedback: "",
      });
    } catch (error) {
      alert("There was a problem submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-4">
            <img src={logoSrc} alt="Huntline Dental Group logo" className="h-14 w-auto rounded-xl object-contain" />
            <div className="hidden sm:block">
              <p className="text-lg font-semibold tracking-tight text-stone-950">{brand.name}</p>
              <p className="text-sm text-stone-500">Post-consultation feedback</p>
            </div>
          </div>
          <a
            href={brand.website}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-600"
          >
            Visit Website
          </a>
        </div>
      </header>

      <main>
        <section className="relative flex min-h-[560px] items-center overflow-hidden border-b border-stone-200">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/building.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-stone-900/70" />

          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
            <div>
              <div className="mb-5 inline-flex items-center rounded-full border border-orange-300/40 bg-white/10 px-4 py-2 text-sm font-medium text-orange-100 shadow-sm backdrop-blur">
                Help us improve the patient experience
              </div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Thank you for meeting with Huntline Dental Group.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-200">
                We would love your feedback on scheduling, your consultation, and how clearly the next steps were explained. This short survey helps our team improve and better support patients after their visit.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#feedback-form"
                  className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-orange-600"
                >
                  Start Feedback Survey
                </a>
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/15"
                >
                  Return to Website
                </a>
              </div>

              <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "Rate scheduling, consultation, and financial presentation",
                  "Tell us the biggest hurdle to your next step",
                  "Choose your preferred follow-up method",
                  brand.address,
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-white shadow-sm backdrop-blur">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pl-6">
              <div className="rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur">
                <div className="rounded-[1.5rem] bg-black/60 p-6 text-white backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.2em] text-orange-200">Patient feedback survey</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight">A few quick questions</h2>
                  <p className="mt-4 max-w-md text-stone-200">
                    Your feedback helps us improve the consultation experience and understand how we can better support your next step.
                  </p>
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-white/20 bg-white/10 p-5 text-white backdrop-blur">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em]">What we learn from this</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-stone-100">
                    <li>How the scheduling experience felt</li>
                    <li>Whether the treatment presentation was clear</li>
                    <li>Whether the financial conversation made sense</li>
                    <li>What may be delaying the next step</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="feedback-form" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="mx-auto mb-8 max-w-3xl rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Survey progress</p>
                <p className="mt-1 text-sm text-stone-600">Complete the quick feedback form below.</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold tracking-tight text-stone-950">{progressPercent}%</p>
                <p className="text-xs text-stone-500">{completedSteps} of {totalSteps} sections</p>
              </div>
            </div>
            <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-stone-200">
              <div className="h-full rounded-full bg-orange-500 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          {submitted ? (
            <div className="mx-auto max-w-4xl rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Thank you</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Your feedback has been received.</h2>
              <p className="mt-4 max-w-2xl text-lg text-stone-600">
                Thank you for taking the time to share your experience. Your feedback helps Huntline Dental Group improve the consultation process and better support future patients.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
                  <h3 className="text-lg font-semibold tracking-tight text-stone-950">What happens next</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    Your survey response has been submitted for team review. Thank you again for sharing your experience with us.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-600"
                >
                  Return to Website
                </a>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center justify-center rounded-2xl border border-stone-300 bg-white px-6 py-4 text-base font-semibold text-stone-700 transition hover:bg-stone-50"
                >
                  Submit Another Response
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Post-consultation survey</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Tell us about your experience</h2>
                <p className="mt-4 max-w-2xl text-lg text-stone-600">
                  This short form is designed to capture how the experience felt and how our team can better support you after your consultation.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextField label="First name" name="firstName" value={formData.firstName} onChange={updateField} required />
                    <TextField label="Last name" name="lastName" value={formData.lastName} onChange={updateField} required />
                    <TextField label="Email" name="email" type="email" value={formData.email} onChange={updateField} required />
                    <TextField label="Phone number" name="phone" value={formData.phone} onChange={updateField} />
                  </div>

                  <RatingCard
                    title="Phone call / scheduling experience"
                    description="How would you rate your scheduling experience with our team?"
                    value={formData.schedulingExperience}
                    onChange={(value) => updateField("schedulingExperience", value)}
                  />

                  <RatingCard
                    title="Consultation / treatment presentation"
                    description="How would you rate the consultation and treatment explanation?"
                    value={formData.consultationExperience}
                    onChange={(value) => updateField("consultationExperience", value)}
                  />

                  <RatingCard
                    title="Financial presentation / understanding next steps"
                    description="How clearly were financial details and next steps explained?"
                    value={formData.financialUnderstanding}
                    onChange={(value) => updateField("financialUnderstanding", value)}
                  />

                  <SelectField
                    label="What is the biggest hurdle to scheduling the next step?"
                    name="biggestHurdle"
                    value={formData.biggestHurdle}
                    onChange={updateField}
                    required
                    options={hurdleOptions}
                  />

                  <SelectField
                    label="Preferred follow-up method"
                    name="preferredFollowUp"
                    value={formData.preferredFollowUp}
                    onChange={updateField}
                    required
                    options={followUpOptions}
                  />

                  <ChoiceCard
                    label="How likely are you to move forward with treatment?"
                    name="likelyToMoveForward"
                    value={formData.likelyToMoveForward}
                    onChange={updateField}
                    options={[
                      "Ready now",
                      "Likely soon",
                      "Still deciding",
                      "Not ready yet",
                    ]}
                  />

                  <ChoiceCard
                    label="Do you still have unanswered questions?"
                    name="stillHaveQuestions"
                    value={formData.stillHaveQuestions}
                    onChange={updateField}
                    options={["Yes", "No"]}
                  />

                  <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
                    <label className="text-base font-semibold tracking-tight text-stone-900">
                      If you could change anything about your consultation experience, what would it be?
                    </label>
                    <textarea
                      value={formData.feedback}
                      onChange={(e) => updateField("feedback", e.target.value)}
                      placeholder="Share anything that would have made the experience clearer, more comfortable, or easier."
                      className="mt-4 min-h-[140px] w-full rounded-2xl border border-stone-300 px-4 py-3 text-sm text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-orange-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                  </button>
                </form>
              </div>

              <div />
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-stone-500 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-4">
            <img src={logoSrc} alt="Huntline Dental Group logo" className="h-10 w-auto rounded-lg object-contain" />
            <div>
              <p className="font-semibold text-stone-800">{brand.name}</p>
              <p>{brand.address}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href={brand.website} target="_blank" rel="noreferrer" className="font-medium text-stone-700 hover:text-orange-600">
              huntlinedentalgroup.com
            </a>
            <span className="inline-flex items-center justify-center rounded-2xl border border-stone-300 px-5 py-3 font-semibold text-stone-700">
              Patient experience survey
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TextField({ label, name, value, onChange, type = "text", placeholder = "", required = false }) {
  return (
    <label className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
      <span className="text-base font-semibold tracking-tight text-stone-900">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-4 w-full rounded-2xl border border-stone-300 px-4 py-3 text-sm text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-orange-400"
      />
    </label>
  );
}

function SelectField({ label, name, value, onChange, options, required = false }) {
  return (
    <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
      <label
        htmlFor={name}
        className="block text-base font-semibold tracking-tight text-stone-900"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        required={required}
        onChange={(e) => onChange(name, e.target.value)}
        className="mt-4 block w-full rounded-2xl border border-stone-300 bg-white px-4 py-4 text-base text-stone-700 outline-none transition focus:border-orange-400"
      >
        <option value="">Select one</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function ChoiceCard({ label, name, value, onChange, options }) {
  return (
    <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
      <h3 className="text-base font-semibold tracking-tight text-stone-900">{label}</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const active = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(name, option)}
              className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                active
                  ? "border-orange-500 bg-orange-50 text-orange-800"
                  : "border-stone-300 bg-white text-stone-700 hover:border-orange-300 hover:bg-orange-50/40"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RatingCard({ title, description, value, onChange }) {
  return (
    <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold tracking-tight text-stone-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-stone-600">{description}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        {ratings.map((rating) => {
          const active = value === rating;
          return (
            <button
              key={rating}
              type="button"
              onClick={() => onChange(rating)}
              className={`flex h-12 w-12 items-center justify-center rounded-full border text-sm font-bold transition ${
                active
                  ? "border-orange-500 bg-orange-500 text-white"
                  : "border-stone-300 bg-white text-stone-700 hover:border-orange-300 hover:bg-orange-50"
              }`}
            >
              {rating}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-stone-500">1 = poor, 5 = excellent</p>
    </div>
  );
}

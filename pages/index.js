import { useMemo, useState } from "react";

const logoSrc = "data:image/jpeg;base64,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";

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

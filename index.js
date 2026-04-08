import { useMemo, useState } from "react";

const brand = {
  name: "Huntline Dental Group",
  address: "1875 Highway 63, Westphalia, MO 65085",
  website: "https://huntlinedentalgroup.com",
  formspreeEndpoint: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT,
};

const hurdleOptions = [
  "No objection / already scheduled",
  "Need to discuss with spouse",
  "Financially unsure",
  "Interested in other options with Huntline",
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
    if (formData.firstName && formData.lastName && formData.email) count++;
    if (formData.schedulingExperience) count++;
    if (formData.consultationExperience) count++;
    if (formData.financialUnderstanding) count++;
    if (formData.biggestHurdle) count++;
    if (formData.preferredFollowUp) count++;
    if (formData.feedback || formData.likelyToMoveForward || formData.stillHaveQuestions) count++;
    return count;
  }, [formData]);

  const progress = Math.round((completedSteps / totalSteps) * 100);

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(brand.formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();

      setSubmitted(true);
    } catch {
      alert("Submission error. Check Formspree.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold mb-4">
          Post-Consultation Feedback
        </h1>

        <div className="mb-6">
          <div className="text-sm mb-1">{progress}% complete</div>
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-orange-500 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {submitted ? (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Thank you!</h2>
            <p>Your feedback has been submitted.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="First Name"
                required
                value={formData.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                className="p-3 border rounded"
              />
              <input
                placeholder="Last Name"
                required
                value={formData.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                className="p-3 border rounded"
              />
            </div>

            <input
              placeholder="Email"
              required
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="p-3 border rounded w-full"
            />

            <Rating title="Scheduling Experience" value={formData.schedulingExperience} onChange={(v)=>updateField("schedulingExperience",v)} />
            <Rating title="Consultation Experience" value={formData.consultationExperience} onChange={(v)=>updateField("consultationExperience",v)} />
            <Rating title="Financial Understanding" value={formData.financialUnderstanding} onChange={(v)=>updateField("financialUnderstanding",v)} />

            <select
              required
              value={formData.biggestHurdle}
              onChange={(e) => updateField("biggestHurdle", e.target.value)}
              className="p-3 border rounded w-full"
            >
              <option value="">Biggest hurdle</option>
              {hurdleOptions.map(o => <option key={o}>{o}</option>)}
            </select>

            <select
              required
              value={formData.preferredFollowUp}
              onChange={(e) => updateField("preferredFollowUp", e.target.value)}
              className="p-3 border rounded w-full"
            >
              <option value="">Preferred follow-up</option>
              {followUpOptions.map(o => <option key={o}>{o}</option>)}
            </select>

            <textarea
              placeholder="What could we improve?"
              value={formData.feedback}
              onChange={(e) => updateField("feedback", e.target.value)}
              className="p-3 border rounded w-full"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-500 text-white px-6 py-3 rounded"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>

          </form>
        )}
      </div>
    </div>
  );
}

function Rating({ title, value, onChange }) {
  return (
    <div>
      <p className="font-semibold mb-2">{title}</p>
      <div className="flex gap-2">
        {[1,2,3,4,5].map(n => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`w-10 h-10 rounded border ${
              value === n ? "bg-orange-500 text-white" : ""
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

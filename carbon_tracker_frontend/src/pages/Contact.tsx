import useAuth from '@/Auth/store';
import  { useState } from 'react'

function Contact() {

    const GLASS_CARD =
    "bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20"

    const user = useAuth((state) => state.user);

    const [contactForm, setContactForm] = useState({ name: user?.name || "", email: user?.email || "", subject: "", message: "" });
    
    const handleContactSubmit = (e:any) => {
      e.preventDefault();
      if (!contactForm.name || !contactForm.email || !contactForm.message) {
        alert("Please fill in all required fields");
        return;
      }
      alert("Thank you for your message! We'll get back to you soon.");
      setContactForm({ name: "", email: "", subject: "", message: "" });
    };

  return (
  <div className="min-h-screen pt-28 px-6 bg-gradient-to-br from-green-50 via-white to-emerald-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">

    <div className="max-w-6xl mx-auto">

      {/* Heading */}
      <div className="text-card-foreground mb-12">
        <h2 className="text-4xl font-bold text-green-700 mb-3">
          Contact Us
        </h2>

        <p className="text-gray-600-card-foreground dark:text-gray-300 mx-auto">
          Have questions, feedback, or suggestions? We'd love to hear from you.
          Reach out to our team anytime.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Contact Form */}
        <div className={`${GLASS_CARD} p-8`}>

          <h3 className="text-2xl font-semibold mb-6 text-green-700">
            Get in Touch
          </h3>

          <form onSubmit={handleContactSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="text-sm font-medium block mb-2">
                Name *
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 rounded-xl bg-white/80 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-green-500"
                value={contactForm.name}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium block mb-2">
                Email *
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-xl bg-white/80 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-green-500"
                value={contactForm.email}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* Subject */}
            <div>
              <label className="text-sm font-medium block mb-2">
                Subject
              </label>

              <input
                type="text"
                placeholder="Enter subject"
                className="w-full p-3 rounded-xl bg-white/80 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-green-500"
                value={contactForm.subject}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    subject: e.target.value,
                  })
                }
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium block mb-2">
                Message *
              </label>

              <textarea
                rows={6}
                placeholder="Write your message..."
                className="w-full p-3 rounded-xl bg-white/80 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-green-500 resize-none"
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    message: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition duration-300 shadow-lg"
            >
              Send Message
            </button>

          </form>
        </div>

        {/* Right Side */}
        <div className="space-y-8">

          {/* Contact Info */}
          <div className={`${GLASS_CARD} p-8`}>

            <h3 className="text-2xl font-semibold mb-6 text-green-700">
              Contact Information
            </h3>

            <div className="space-y-5 text-gray-700 dark:text-gray-300">

              <div>
                <p className="font-semibold mb-1">Email</p>
                <p>support@carbontracker.com</p>
              </div>

              <div>
                <p className="font-semibold mb-1">Phone</p>
                <p>+91 98765 43210</p>
              </div>

              <div>
                <p className="font-semibold mb-1">Address</p>
                <p>
                  Green Tech Park,
                  <br />
                  Noida, Uttar Pradesh,
                  <br />
                  India
                </p>
              </div>

            </div>
          </div>

          {/* FAQ */}
          <div className={`${GLASS_CARD} p-8`}>

            <h3 className="text-2xl font-semibold mb-6 text-green-700">
              Frequently Asked Questions
            </h3>

            <div className="space-y-5">

              <div>
                <p className="font-semibold mb-2">
                  How accurate are the calculations?
                </p>

                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Our platform uses industry-standard emission factors to provide reliable estimates.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-2">
                  Can I export my data?
                </p>

                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Yes, you can export your reports and analytics from the dashboard.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-2">
                  Is my data secure?
                </p>

                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Your information is securely stored and protected using modern authentication practices.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
)
}

export default Contact

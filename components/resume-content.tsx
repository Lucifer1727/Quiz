import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

export default function ResumeContent() {
  return (
    <div className="container mx-auto p-4 bg-blue-50 min-h-screen font-body">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 transition duration-500 ease-out transform">
        <h1 className="text-4xl font-bold text-blue-800 font-heading">
          Jayesh Raiger's Resume
        </h1>
        <Button asChild className="bg-blue-500 text-white hover:bg-blue-600">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Contact Information */}
        <div className="transition transform hover:scale-105 duration-300">
          <Card className="bg-white shadow-lg rounded-lg">
            <CardHeader className="bg-blue-100 p-4 rounded-t-lg">
              <CardTitle className="text-blue-800 font-heading">
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex justify-center space-x-6">
              <a
                href="tel:9654259912"
                className="transition transform hover:scale-110 active:scale-95"
              >
                <Phone size={32} className="text-blue-600" />
              </a>
              <a
                href="https://www.linkedin.com/in/jayesh-raiger-b8649926b"
                target="_blank"
                rel="noopener noreferrer"
                className="transition transform hover:scale-110 active:scale-95"
              >
                <Linkedin size={32} className="text-blue-600" />
              </a>
              <a
                href="https://github.com/Lucifer1727/Lucifer1727.git"
                target="_blank"
                rel="noopener noreferrer"
                className="transition transform hover:scale-110 active:scale-95"
              >
                <Github size={32} className="text-blue-600" />
              </a>
              <a
                href="mailto:jayeshraiger@example.com"
                className="transition transform hover:scale-110 active:scale-95"
              >
                <Mail size={32} className="text-blue-600" />
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Education */}
        <div className="transition transform hover:scale-105 duration-300">
          <Card className="bg-white shadow-lg rounded-lg">
            <CardHeader className="bg-blue-100 p-4 rounded-t-lg">
              <CardTitle className="text-blue-800 font-heading">
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-700">
                Indian Institute of Information Technology Nagpur, Maharashtra
              </h3>
              <p className="text-blue-600">
                Bachelors of Technology, Computer Science
              </p>
              <p className="text-blue-600">Dec. 2022– Present</p>
            </CardContent>
          </Card>
        </div>

        {/* Technical Skills */}
        <div className="transition transform hover:scale-105 duration-300">
          <Card className="bg-white shadow-lg rounded-lg">
            <CardHeader className="bg-blue-100 p-4 rounded-t-lg">
              <CardTitle className="text-blue-800 font-heading">
                Technical Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="list-disc list-inside text-blue-700 space-y-1">
                <li>
                  Languages: Java, Python, C/C++, SQL (Postgres), JavaScript,
                  HTML/CSS
                </li>
                <li>Frameworks: ReactNative, Node.js, Tailwind CSS</li>
                <li>
                  Developer Tools: Git/Github, VS Code, Visual Studio, Figma,
                  Microsoft (Excel, Word, Power Point)
                </li>
                <li>
                  Libraries: Framer-Motion, MaterialUI, CreateReactApp,
                  Nextauth, Mongoose, Prisma
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Development Experience */}
        <div className="transition transform hover:scale-105 duration-300">
          <Card className="bg-white shadow-lg rounded-lg">
            <CardHeader className="bg-blue-100 p-4 rounded-t-lg">
              <CardTitle className="text-blue-800 font-heading">
                Development Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-700">
                Full Stack Web Development Intern at Codestam Technologies
              </h3>
              <p className="text-blue-600">March 2024– April 2024 | Remote</p>
              <ul className="list-disc list-inside text-blue-700 space-y-1 mt-2">
                <li>
                  Led development tasks for "Pradaya," focusing on features like
                  email verification and secure routing.
                </li>
                <li>
                  Implemented user authentication using NextAuth for secure
                  sign-in and login processes.
                </li>
                <li>
                  Collaborated with the team to improve front-end interfaces
                  using Next.js and Tailwind CSS for better user experience.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Management Experience */}
        <div className="transition transform hover:scale-105 duration-300">
          <Card className="bg-white shadow-lg rounded-lg">
            <CardHeader className="bg-blue-100 p-4 rounded-t-lg">
              <CardTitle className="text-blue-800 font-heading">
                Management Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-700">
                Finance and Management Intern at HRDC
              </h3>
              <p className="text-blue-600">
                25th April 2024 - 26th June 2024 | On-Site
              </p>
              <ul className="list-disc list-inside text-blue-700 space-y-1 mt-2">
                <li>
                  Analyzed financial data and created clear, detailed reports to
                  help with decision-making.
                </li>
                <li>
                  Worked closely with remote teams to manage projects, showing
                  strong teamwork and leadership skills.
                </li>
                <li>
                  Used management tools to explore different scenarios and help
                  plan strategies for better operations and finances.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <div className="transition transform hover:scale-105 duration-300">
          <Card className="bg-white shadow-lg rounded-lg">
            <CardHeader className="bg-blue-100 p-4 rounded-t-lg">
              <CardTitle className="text-blue-800 font-heading">
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold text-blue-700">
                  Smart India Hackathon Finalist
                </h3>
                <p className="text-blue-600">
                  Oct. 2023 - Nov. 2023 | IIIT Nagpur
                </p>
                <ul className="list-disc list-inside text-blue-700 space-y-1 mt-2">
                  <li>
                    Frontend developer in a 6-member team for the Smart India
                    Hackathon.
                  </li>
                  <li>
                    Developed a website for online wool transport and business
                    management.
                  </li>
                  <li>
                    Project recognized as a finalist in the Smart India
                    Hackathon (SIH).
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-700">
                  Hack4Future Hackathon Winner
                </h3>
                <p className="text-blue-600">
                  Feb 2024 - 26th Feb. 2024 | SBU Ranchi
                </p>
                <ul className="list-disc list-inside text-blue-700 space-y-1 mt-2">
                  <li>
                    Full stack developer in a 4-member team for the Hack4future
                    Hackathon.
                  </li>
                  <li>
                    Developed a robust web application tailored to aid children
                    with ADHD, ASD, and dyslexia.
                  </li>
                  <li>
                    Dedicated to providing accessible and user-friendly features
                    for our target audience.
                  </li>
                  <li>
                    Collaborated closely with team members to ensure seamless
                    integration of frontend and backend functionalities.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects */}
        <div className="transition transform hover:scale-105 duration-300">
          <Card className="bg-white shadow-lg rounded-lg">
            <CardHeader className="bg-blue-100 p-4 rounded-t-lg">
              <CardTitle className="text-blue-800 font-heading">
                Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold text-blue-700">
                  KrishiMitra | HTML, CSS, JavaScript, ML
                </h3>
                <p className="text-blue-600">Oct. 2023– Nov. 2023</p>
                <ul className="list-disc list-inside text-blue-700 space-y-1 mt-2">
                  <li>
                    Developed a website for online wool transport and business
                    management.
                  </li>
                  <li>
                    Aimed to streamline wool transport processes and enhance
                    business management efficiency.
                  </li>
                  <li>
                    Project recognized as a finalist in the Smart India
                    Hackathon (SIH).
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-700">
                  NeuroNurturer | MERN Stack, TailwindCSS framework, Chatgpt
                  API's, Github, etc
                </h3>
                <p className="text-blue-600">Feb. 2024</p>
                <ul className="list-disc list-inside text-blue-700 space-y-1 mt-2">
                  <li>
                    Developed a robust web application tailored to aid children
                    with ADHD, ASD, and dyslexia.
                  </li>
                  <li>
                    Utilized comprehensive skills in full-stack web development
                    to create an innovative solution.
                  </li>
                  <li>
                    Dedicated to providing accessible and user-friendly features
                    for our target audience.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

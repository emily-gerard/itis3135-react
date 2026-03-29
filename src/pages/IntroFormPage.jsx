import { useState } from "react";
import lizardImg from "../assets/images/lizard.jpg";

const initialCourses = [
  {
    dep: "ITIS",
    num: "3135",
    name: "Front End Web Development",
    reason: "Required course.",
  },
  {
    dep: "MATH",
    num: "1241",
    name: "Calculus 1",
    reason: "Required course.",
  },
  {
    dep: "CTCM",
    num: "2530",
    name: "Critical Thinking",
    reason: "Required course.",
  },
  {
    dep: "ITSC",
    num: "2181",
    name: "Intro to Computer Systems",
    reason: "Required course.",
  },
  {
    dep: "ANTH",
    num: "2141",
    name: "Biological Anthropology",
    reason: "Required course.",
  },
  {
    dep: "ANTH",
    num: "2141",
    name: "Biological Anthropology Lab",
    reason: "Required course.",
  },
];

const initialFormData = {
  f_name: "Emily",
  m_name: "Elizabeth",
  n_name: "",
  l_name: "Gerard",
  acknowledgement:
    "I understand that what is on this page is not password protected...",
  ack_date: "2026-01-13",
  mascot_adj: "Eclectic",
  mascot_ani: "Goldfish",
  divider: "|",
  caption: "Made a lizard friend.",
  p_statement: "I’m a sophomore at UNC Charlotte studying computer science...",
  per_background: "I spend most of my free time on my computer...",
  prof_background: "I’ve worked in customer service since I was 16...",
  a_background: "I’m currently a sophomore at UNC Charlotte...",
  sub_background:
    "I’ve taken a class in high school covering surface level web development...",
  prim_comp: "I mainly use my Macbook Pro laptop...",
  backup: "I have my personal custom desktop computer...",
  quote: "A person who thinks all the time...",
  author: "Alan Watts",
  fun_fact: "I've seen the same music artist four times!",
  share: "",
  github: "https://github.com/emily-gerard",
  git_io: "https://emily-gerard.github.io/",
  clt_site: "https://webpages.charlotte.edu/egerard2/",
  linked: "https://www.linkedin.com/in/emily-gerard-527338393/",
  fcc: "https://www.freecodecamp.org/emilygerard",
};

function escapeHtml(text) {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default function IntroFormPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [courses, setCourses] = useState(initialCourses);
  const [imagePreview, setImagePreview] = useState(lizardImg);
  const [imageFileName, setImageFileName] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageFileName(file.name);
    setImagePreview(URL.createObjectURL(file));
  }

  function handleCourseChange(index, field, value) {
    setCourses((prev) =>
      prev.map((course, i) =>
        i === index ? { ...course, [field]: value } : course
      )
    );
  }

  function addCourse() {
    setCourses((prev) => [...prev, { dep: "", num: "", name: "", reason: "" }]);
  }

  function removeCourse(index) {
    setCourses((prev) => prev.filter((_, i) => i !== index));
  }

  function handleClear() {
    setFormData({
      f_name: "",
      m_name: "",
      n_name: "",
      l_name: "",
      acknowledgement: "",
      ack_date: "",
      mascot_adj: "",
      mascot_ani: "",
      divider: "",
      caption: "",
      p_statement: "",
      per_background: "",
      prof_background: "",
      a_background: "",
      sub_background: "",
      prim_comp: "",
      backup: "",
      quote: "",
      author: "",
      fun_fact: "",
      share: "",
      github: "",
      git_io: "",
      clt_site: "",
      linked: "",
      fcc: "",
    });
    setCourses([]);
    setImagePreview("");
    setImageFileName("");
    setJsonOutput("");
    setHtmlOutput("");
    setSubmittedData(null);
  }

  function handleReset() {
    setFormData(initialFormData);
    setCourses(initialCourses);
    setImagePreview(lizardImg);
    setImageFileName("");
    setJsonOutput("");
    setHtmlOutput("");
    setSubmittedData(null);
  }

  function generateJSON() {
    const payload = {
      ...formData,
      picture: imageFileName || "lizard.jpg",
      courses,
    };
    setJsonOutput(JSON.stringify(payload, null, 2));
    setHtmlOutput("");
  }

  function generateHTML() {
    const pictureFile = imageFileName || "lizard.jpg";

    const courseItems = courses
      .filter(
        (course) =>
          course.dep.trim() ||
          course.num.trim() ||
          course.name.trim() ||
          course.reason.trim()
      )
      .map(
        (course) => `
            <li>
              <strong>${escapeHtml(course.dep)} ${escapeHtml(
          course.num
        )} - ${escapeHtml(course.name)}: </strong>${escapeHtml(course.reason)}
            </li>`
      )
      .join("");

    const optionalShare = formData.share.trim()
      ? `
        <li>
          <strong>Something to Share: </strong>${escapeHtml(formData.share)}
        </li>`
      : "";

    const optionalFunFact = formData.fun_fact.trim()
      ? `
        <li>
          <strong>Fun Fact: </strong>${escapeHtml(formData.fun_fact)}
        </li>`
      : "";

    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(formData.f_name)} ${escapeHtml(
      formData.l_name
    )} | ${escapeHtml(formData.mascot_adj)} ${escapeHtml(
      formData.mascot_ani
    )}</title>
  </head>
  <body>
    <main>
      <h2>${escapeHtml(formData.f_name)} ${escapeHtml(
      formData.m_name
    )} ${escapeHtml(formData.l_name)}</h2>

      <h3>${escapeHtml(formData.mascot_adj)} ${escapeHtml(
      formData.mascot_ani
    )}</h3>

      <figure>
        <img
          src="images/${escapeHtml(pictureFile)}"
          alt="${escapeHtml(formData.caption)}"
          width="210"
          height="200"
        />
        <figcaption>${escapeHtml(formData.caption)}</figcaption>
      </figure>

      <h3>Personal Statement</h3>
      <p>${escapeHtml(formData.p_statement)}</p>

      <h3>Background</h3>
      <ul>
        <li>
          <strong>Personal Background: </strong>${escapeHtml(
            formData.per_background
          )}
        </li>
        <li>
          <strong>Professional Background: </strong>${escapeHtml(
            formData.prof_background
          )}
        </li>
        <li>
          <strong>Academic Background: </strong>${escapeHtml(
            formData.a_background
          )}
        </li>
        <li>
          <strong>Background in Subject: </strong>${escapeHtml(
            formData.sub_background
          )}
        </li>
        <li>
          <strong>Primary Computer: </strong>${escapeHtml(formData.prim_comp)}
        </li>
        <li>
          <strong>Backup Computer: </strong>${escapeHtml(formData.backup)}
        </li>
        <li>
          <strong>Current Courses: </strong>
          <ol>${courseItems}
          </ol>
        </li>${optionalFunFact}${optionalShare}
      </ul>

      <blockquote>
        "${escapeHtml(formData.quote)}"
        <cite>- ${escapeHtml(formData.author)}</cite>
      </blockquote>

      <p>
        <a href="${escapeHtml(formData.github)}" target="_blank">GitHub</a>
        ${escapeHtml(formData.divider)}
        <a href="${escapeHtml(formData.git_io)}" target="_blank">GitHub.io</a>
        ${escapeHtml(formData.divider)}
        <a href="${escapeHtml(formData.clt_site)}" target="_blank">CLT Site</a>
        ${escapeHtml(formData.divider)}
        <a href="${escapeHtml(formData.linked)}" target="_blank">LinkedIn</a>
        ${escapeHtml(formData.divider)}
        <a href="${escapeHtml(formData.fcc)}" target="_blank">FreeCodeCamp</a>
      </p>
    </main>
  </body>
</html>`;

    setHtmlOutput(html);
    setJsonOutput("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      ...formData,
      picture: imageFileName || "lizard.jpg",
      courses,
    };

    setSubmittedData(payload);
    setJsonOutput("");
    setHtmlOutput("");
  }

  return (
    <>
      <h2>Introduction Form</h2>
      <h3>Please submit the form below.</h3>

      <form onSubmit={handleSubmit} id="form">
        <p>
          <label htmlFor="f_name">First Name: </label>
          <input
            type="text"
            id="f_name"
            name="f_name"
            value={formData.f_name}
            placeholder="Enter first name"
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor="m_name">Middle Name: </label>
          <input
            type="text"
            id="m_name"
            name="m_name"
            value={formData.m_name}
            placeholder="Enter middle name (optional)"
            onChange={handleChange}
          />
        </p>

        <p>
          <label htmlFor="n_name">Nickname: </label>
          <input
            type="text"
            id="n_name"
            name="n_name"
            value={formData.n_name}
            placeholder="Enter nickname/preferred name (optional)"
            onChange={handleChange}
          />
        </p>

        <p>
          <label htmlFor="l_name">Last Name: </label>
          <input
            type="text"
            id="l_name"
            name="l_name"
            value={formData.l_name}
            placeholder="Enter last name"
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor="acknowledgement">Acknowledgement Statement: </label>
          <input
            type="text"
            id="acknowledgement"
            name="acknowledgement"
            value={formData.acknowledgement}
            placeholder="Enter acknowledgement statement"
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor="ack_date">Acknowledgement Date: </label>
          <input
            type="date"
            id="ack_date"
            name="ack_date"
            value={formData.ack_date}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor="mascot_adj">Mascot Adjective: </label>
          <input
            type="text"
            id="mascot_adj"
            name="mascot_adj"
            value={formData.mascot_adj}
            placeholder="Enter adjective matching first initial"
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor="mascot_ani">Mascot Animal: </label>
          <input
            type="text"
            id="mascot_ani"
            name="mascot_ani"
            value={formData.mascot_ani}
            placeholder="Enter animal matching last initial"
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor="divider">Divider: </label>
          <input
            type="text"
            id="divider"
            name="divider"
            value={formData.divider}
            placeholder="Enter a divider"
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor="picture">Picture: </label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              width="210"
              height="200"
              style={{ display: "block", margin: "0.5rem 0" }}
            />
          )}
          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/*"
            onChange={handleImageChange}
          />
        </p>

        <p>
          <label htmlFor="caption">Picture Caption: </label>
          <input
            type="text"
            id="caption"
            name="caption"
            value={formData.caption}
            placeholder="Enter picture caption"
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor="p_statement">Personal Statement: </label>
          <input
            type="text"
            id="p_statement"
            name="p_statement"
            value={formData.p_statement}
            placeholder="Enter a personal statement"
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor="per_background">Personal Background: </label>
          <input
            type="text"
            id="per_background"
            name="per_background"
            value={formData.per_background}
            placeholder="Enter personal background"
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor="prof_background">Professional Background: </label>
          <input
            type="text"
            id="prof_background"
            name="prof_background"
            value={formData.prof_background}
            placeholder="Enter professional background"
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor="a_background">Academic Background: </label>
          <input
            type="text"
            id="a_background"
            name="a_background"
            value={formData.a_background}
            placeholder="Enter academic background"
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor="sub_background">Background in Subject: </label>
          <input
            type="text"
            id="sub_background"
            name="sub_background"
            value={formData.sub_background}
            placeholder="Enter subject background"
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor="prim_comp">Primary Computer: </label>
          <input
            type="text"
            id="prim_comp"
            name="prim_comp"
            value={formData.prim_comp}
            placeholder="Enter primary computer"
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor="backup">Backup Computer: </label>
          <input
            type="text"
            id="backup"
            name="backup"
            value={formData.backup}
            placeholder="Enter backup computer"
            onChange={handleChange}
            required
          />
        </p>

        <hr />

        <div id="courses-container">
          {courses.map((course, index) => (
            <div key={index}>
              <h4>
                Course {index + 1}
                {index >= 5 ? " (optional)" : ""}:
              </h4>

              <p>
                <label htmlFor={`c${index + 1}_dep`}>Course Department: </label>
                <input
                  type="text"
                  id={`c${index + 1}_dep`}
                  value={course.dep}
                  placeholder="e.g. ITIS"
                  onChange={(e) =>
                    handleCourseChange(index, "dep", e.target.value)
                  }
                  required={index < 5}
                />

                <label htmlFor={`c${index + 1}_num`}>Course Number: </label>
                <input
                  type="number"
                  id={`c${index + 1}_num`}
                  value={course.num}
                  placeholder="e.g. 3135"
                  onChange={(e) =>
                    handleCourseChange(index, "num", e.target.value)
                  }
                  required={index < 5}
                />

                <label htmlFor={`c${index + 1}_name`}>Course Name: </label>
                <input
                  type="text"
                  id={`c${index + 1}_name`}
                  value={course.name}
                  placeholder="e.g. Front End Web Development"
                  onChange={(e) =>
                    handleCourseChange(index, "name", e.target.value)
                  }
                  required={index < 5}
                />

                <label htmlFor={`c${index + 1}_reason`}>Course Reason: </label>
                <input
                  type="text"
                  id={`c${index + 1}_reason`}
                  value={course.reason}
                  placeholder="Enter reason for course"
                  onChange={(e) =>
                    handleCourseChange(index, "reason", e.target.value)
                  }
                  required={index < 5}
                />
              </p>

              {courses.length > 1 && (
                <p>
                  <button type="button" onClick={() => removeCourse(index)}>
                    Remove Course
                  </button>
                </p>
              )}
            </div>
          ))}
        </div>

        <p>
          <button type="button" id="add-course-btn" onClick={addCourse}>
            Add Course
          </button>
        </p>

        <hr />

        <p>
          <label htmlFor="quote">Quote: </label>
          <input
            type="text"
            id="quote"
            name="quote"
            value={formData.quote}
            placeholder="Enter favorite quote"
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor="author">Quote Author: </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            placeholder="Enter quote author"
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor="fun_fact">Fun Fact: </label>
          <input
            type="text"
            id="fun_fact"
            name="fun_fact"
            value={formData.fun_fact}
            placeholder="Enter fun fact (optional)"
            onChange={handleChange}
          />
        </p>

        <p>
          <label htmlFor="share">Something to Share: </label>
          <input
            type="text"
            id="share"
            name="share"
            value={formData.share}
            placeholder="Enter something to share (optional)"
            onChange={handleChange}
          />
        </p>

        <h4>Links:</h4>

        <p>
          <label htmlFor="github">GitHub: </label>
          <input
            type="url"
            id="github"
            name="github"
            value={formData.github}
            placeholder="Enter personal GitHub URL"
            onChange={handleChange}
            required
          />

          <label htmlFor="git_io">GitHub.io: </label>
          <input
            type="url"
            id="git_io"
            name="git_io"
            value={formData.git_io}
            placeholder="Enter personal GitHub.io URL"
            onChange={handleChange}
            required
          />

          <label htmlFor="clt_site">Charlotte Site: </label>
          <input
            type="url"
            id="clt_site"
            name="clt_site"
            value={formData.clt_site}
            placeholder="Enter Charlotte website URL"
            onChange={handleChange}
            required
          />

          <label htmlFor="linked">LinkedIn: </label>
          <input
            type="url"
            id="linked"
            name="linked"
            value={formData.linked}
            placeholder="Enter personal LinkedIn URL"
            onChange={handleChange}
            required
          />

          <label htmlFor="fcc">FreeCodeCamp: </label>
          <input
            type="url"
            id="fcc"
            name="fcc"
            value={formData.fcc}
            placeholder="Enter personal FreeCodeCamp URL"
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
          <button type="button" id="generate-json-btn" onClick={generateJSON}>
            Generate JSON
          </button>
          <button type="button" onClick={generateHTML}>
            Generate HTML
          </button>
          <button type="button" id="clear-btn" onClick={handleClear}>
            Clear
          </button>
        </p>
      </form>

      {jsonOutput && (
        <>
          <h3>JSON Output</h3>
          <pre>
            <code>{jsonOutput}</code>
          </pre>
        </>
      )}

      {htmlOutput && (
        <>
          <h3>HTML Output</h3>
          <pre>
            <code>{htmlOutput}</code>
          </pre>
        </>
      )}

      {submittedData && (
        <>
          <h3>Submitted Preview</h3>
          <p>
            {submittedData.f_name} {submittedData.m_name} {submittedData.l_name}
          </p>
          <p>
            {submittedData.mascot_adj} {submittedData.mascot_ani}
          </p>
          {imagePreview && (
            <figure>
              <img
                src={imagePreview}
                alt={submittedData.caption}
                width="210"
                height="200"
              />
              <figcaption>{submittedData.caption}</figcaption>
            </figure>
          )}

          <h4>Personal Statement</h4>
          <p>{submittedData.p_statement}</p>

          <h4>Background</h4>
          <ul>
            <li>
              <strong>Personal Background: </strong>
              {submittedData.per_background}
            </li>
            <li>
              <strong>Professional Background: </strong>
              {submittedData.prof_background}
            </li>
            <li>
              <strong>Academic Background: </strong>
              {submittedData.a_background}
            </li>
            <li>
              <strong>Background in Subject: </strong>
              {submittedData.sub_background}
            </li>
            <li>
              <strong>Primary Computer: </strong>
              {submittedData.prim_comp}
            </li>
            <li>
              <strong>Backup Computer: </strong>
              {submittedData.backup}
            </li>
            <li>
              <strong>Current Courses: </strong>
              <ol>
                {submittedData.courses.map((course, index) => (
                  <li key={index}>
                    <strong>
                      {course.dep} {course.num} - {course.name}:{" "}
                    </strong>
                    {course.reason}
                  </li>
                ))}
              </ol>
            </li>
            {submittedData.fun_fact && (
              <li>
                <strong>Fun Fact: </strong>
                {submittedData.fun_fact}
              </li>
            )}
            {submittedData.share && (
              <li>
                <strong>Something to Share: </strong>
                {submittedData.share}
              </li>
            )}
          </ul>

          <blockquote>
            “{submittedData.quote}” <cite>- {submittedData.author}</cite>
          </blockquote>
        </>
      )}
    </>
  );
}

import { useState } from "react";
import AutoComplete from "./components/autocomplete/Autocomplete";
import { Pagination } from "./components/pagination/Pagination";
import { useSnackBar } from "./components/snackbar/SnackbarProvider";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "./components/modal/Modal";
import { TabPanel, Tabs } from "./components/tabs/Tabs";
import {
  Accordion,
  AccordionContent,
  AccordionTitle,
} from "./components/accordion/Accordion";

export default function Demo() {
  const { snackBar } = useSnackBar();
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [val, setVal] = useState(0);

  return (
    <main className="demo">
      <header className="demo-header">
        <h1>Frontend Machine Coding Demo</h1>
        <p>Accessible, reusable UI components built from scratch.</p>
      </header>

      <div className="demo-grid">
        <section className="card">
          <h2 className="card-title">Feedback & Notifications</h2>
          <p className="card-subtitle">
            Trigger a toast and open an accessible modal.
          </p>
          <div className="actions">
            <button
              onClick={() =>
                snackBar({
                  text: "This Snackbar will be dismissed in 5 seconds",
                  dismissTimeout: 5000,
                })
              }
            >
              Show Notification
            </button>

            <button
              onClick={() =>
                snackBar({
                  text: "This Snackbar will be dismissed in 2 seconds",
                })
              }
            >
              Show Notification
            </button>

            <button onClick={() => setOpenModal(true)}>Open Modal</button>
          </div>
        </section>

        <section className="card">
          <h2 className="card-title">Pagination</h2>
          <p className="card-subtitle">
            Navigate pages with keyboard and a11y support.
          </p>
          <Pagination
            count={20}
            page={page}
            onChange={setPage}
            variant="outlined"
            showFirstButton
            showLastButton
          />
          <p className="hint">Current page: {page} / 20</p>
        </section>

        <section className="card">
          <h2 className="card-title">Autocomplete</h2>
          <p className="card-subtitle">Type to filter and select a city.</p>
          <AutoComplete
            options={cities}
            placeholder="Select your city"
            defaultValue="Bengaluru"
          />
        </section>

        <section className="card">
          <h2 className="card-title">Tabs</h2>
          <p className="card-subtitle">
            Arrow keys switch tabs; focus management included.
          </p>
          <Tabs tabs={tabs} value={val} onChange={setVal} />
          <div>
            <TabPanel value={val} index={0}>
              <h3>Tab One</h3>
              <p>This is the content of Tab One.</p>
            </TabPanel>
            <TabPanel value={val} index={1}>
              <h3>Tab Two</h3>
              <p>This is the content of Tab Two.</p>
            </TabPanel>
            <TabPanel value={val} index={2}>
              <h3>Tab Three</h3>
              <p>This is the content of Tab Three.</p>
            </TabPanel>
          </div>
        </section>

        <section className="card">
          <h2 className="card-title">Accordion</h2>
          <p className="card-subtitle">MUI type accordion component</p>

          <div>
            <Accordion>
              <AccordionTitle>HTML</AccordionTitle>
              <AccordionContent>
                The HyperText Markup Language or HTML is the standard markup
                language for documents designed to be displayed in a web
                browser.
              </AccordionContent>
            </Accordion>

            <Accordion>
              <AccordionTitle>CSS</AccordionTitle>
              <AccordionContent>
                Cascading Style Sheets is a style sheet language used for
                describing the presentation of a document written in a markup
                language such as HTML or XML.
              </AccordionContent>
            </Accordion>

            <Accordion>
              <AccordionTitle>JavaScript</AccordionTitle>
              <AccordionContent>
                JavaScript, often abbreviated as JS, is a programming language
                that is one of the core technologies of the World Wide Web,
                alongside HTML and CSS.
              </AccordionContent>
            </Accordion>
          </div>
        </section>
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Feedback Form</ModalHeader>
        <ModalContent>
          <p>Provide your feedback, we will get back in 3-5 business days.</p>
          <input placeholder="john@gmail.com" />
          <textarea placeholder="Your message here" rows={5}></textarea>
          <button type="button">Submit</button>
        </ModalContent>
        <ModalFooter>
          <button onClick={() => setOpenModal(false)}>Close</button>
        </ModalFooter>
      </Modal>
    </main>
  );
}

const cities = [
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Mumbai",
  "Delhi",
  "Chennai",
  "Kolkata",
  "Jaipur",
  "Ahmedabad",
  "Kochi",
  "Punjab",
];

const tabs = [
  { label: "Tab One" },
  { label: "Tab Two" },
  { label: "Tab Three" },
];

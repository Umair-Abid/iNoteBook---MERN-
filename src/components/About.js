import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
    } else {
      // eslint-disable-next-line
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <h1 className="text-center ">About iNoteBook</h1>
      <div class="accordion my-4" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              A Better Way to Keep Track of Your Tasks? Check!
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <strong>What people are saying</strong> If you’re not using
              iNoteBook, you’re missing out.If you’re looking for a
              cross-platform note-taking tool with just enough frills, it’s hard
              to look beyond iNoteBook.If you want a truly distraction-free
              environment then you can’t do better than iNoteBook for your
              note-taking needs.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Use it everywhere
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <strong>The simplest way to keep notes</strong> Notes stay updated
              across all your devices, automatically and in real time. There’s
              no “sync” button: It just works.All your notes, synced on all your
              devices. Get Simplenote now for iOS, Android, Mac, Windows, Linux,
              or in your browser.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              It’s free
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <strong>Every service is free of cost</strong> Apps, backups,
              syncing, sharing – it’s all completely free.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

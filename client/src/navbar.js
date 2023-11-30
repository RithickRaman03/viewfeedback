import React from "react";

export default function Navbar() {
  return (
    <>
      {/* <button id="close-btn">
            <span className="material-symbols-sharp">close</span>
          </button> */}
      <main>
        <aside>
          <div className="sidebar">
            <a className={"icon"}>
              <span class="material-symbols-outlined google-icon">home</span>
              <h4 className="text">HOME</h4>
            </a>
            <a className={"icon"}>
              <span class="material-symbols-outlined google-icon">reviews</span>{" "}
              <h4 className="text"> VIEW FEEDBACK</h4>
            </a>

            <a href="#" className={"icon"}>
              <span className="material-symbols-outlined google-icon">
                question_mark
              </span>
              <h4 className="text">HELP</h4>
            </a>
            <a className={"icon"}>
              <span className="material-symbols-outlined google-icon">
                logout
              </span>
              <h4 className="text">LOGOUT</h4>
            </a>
          </div>
        </aside>
      </main>
    </>
  );
}

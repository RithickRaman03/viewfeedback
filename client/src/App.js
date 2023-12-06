import React, { useEffect, useState } from "react";
import axios from "axios";
import Starating from "./starating";
import Topbar from "./topbar";
import Navbar from "./navbar";
import Popup from "reactjs-popup/dist/index";

const App = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [totalStars, setTotalStars] = useState(0);
  const [averageStars, setAverageStars] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/viewpage");
        setFeedbackData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const calculateStar = () => {
      const stars = feedbackData.reduce(
        (sum, feedback) => sum + parseInt(feedback.answer),
        0
      );

      setTotalStars(stars);
      const average = stars / feedbackData.length || 0;
      setAverageStars(average);
    };

    calculateStar();
  }, [feedbackData]);

  // Function to calculate average for a specific file
  const calculateFileAverage = (file) => {
    const fileStars = file.feedback.reduce(
      (sum, feedback) => sum + parseInt(feedback.answer),
      0
    );
    return fileStars / file.feedback.length || 0;
  };

  return (
    <div>
      <Topbar />
      <div className="viewfeed-fullcontent">
        <Navbar />

        <div className="viewfeed-content">
          <p1>FEEDBACK</p1>
          <div className="viewfeed-overall">
            <h1>
              {" "}
              Overall Rating:
              {averageStars}
            </h1>

            <Starating
              answer={[averageStars.toFixed(2)]}
              size={24}
              marginLeft={15}
            />
            <br></br>
            <b>
              Number of Documents:{" "}
              {
                Object.values(
                  feedbackData.reduce((uniqueFiles, feedback) => {
                    const fileId = feedback.file_id;
                    if (!uniqueFiles[fileId]) {
                      uniqueFiles[fileId] = true;
                    }
                    return uniqueFiles;
                  }, {})
                ).length
              }
            </b>
            <br />
          </div>

          <table className="viewfeed-viewtable">
            <thead>
              <tr>
                <th>DOCUMENT</th>
                <th>REVIEWER</th>
                <th>FEEDBACK</th>
                <th className="viewfeed-comments-header">COMMENTS</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(
                feedbackData.reduce((uniqueFiles, feedback) => {
                  const fileId = feedback.file_id;

                  if (!uniqueFiles[fileId]) {
                    uniqueFiles[fileId] = {
                      file_name: feedback.file_name,
                      submitted_by: feedback.submitted_by,
                      feedback: [],
                      comments: feedback.comment,
                    };
                  }

                  uniqueFiles[fileId].feedback.push({
                    question: feedback.question,
                    answer: feedback.answer,
                  });

                  return uniqueFiles;
                }, {})
              ).map((file, index) => (
                <tr key={index}>
                  <td>{file.file_name}</td>
                  <td>{file.submitted_by}</td>
                  <td>
                    <Popup
                      trigger={
                        <button id="starbutton">
                          <Starating
                            answer={[calculateFileAverage(file).toFixed(2)]}
                            size={24}
                            marginLeft={10}
                          />
                        </button>
                      }
                      position="center down"
                    >
                      <div className="viewfeed-displayedcontent">
                        {file.feedback.map((item, i) => (
                          <div className="items" key={i}>
                            <tbody>
                              <tr>
                                <i className="viewfeed-question">
                                  {item.question}
                                </i>
                              </tr>
                              <tr style={{ textAlign: "center" }}>
                                <Starating
                                  answer={item.answer}
                                  size={15}
                                  marginLeft={1}
                                />
                              </tr>
                            </tbody>
                          </div>
                        ))}
                      </div>
                    </Popup>
                  </td>
                  <td>{file.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;

import React from 'react';

function App() {
  return <CheckOut {...checkOutData} />;
}

export default App;

function CheckOut(props) {
  const {
    checkout,
    untitledDesign20210310T1817021,
    untitledDesign20210310T1819381,
    text1,
    text2,
    untitledDesign20210317T1538111,
    submit,
    line9,
    writeAReview,
    place,
  } = props;

  return (
    <div class="container-center-horizontal">
      <div className="checkout screen" style={{ backgroundImage: `url(${checkout})` }}>
        <div className="overlap-group">
          <div className="rectangle-43"></div>
          <div className="rectangle-54"></div>
          <img className="untitled-design-03-10-t181702-1" src={untitledDesign20210310T1817021} />
          <img className="untitled-design-03-10-t181938-1" src={untitledDesign20210310T1819381} />
          <div className="text-1">{text1}</div>
          <div className="rectangle-55"></div>
          <div className="text-2">{text2}</div>
          <img className="untitled-design-03-17-t153811-1" src={untitledDesign20210317T1538111} />
          <div className="submit">{submit}</div>
          <img className="line-9" src={line9} />
          <div className="write-a-review">{writeAReview}</div>
        </div>
        <div className="overlap-group1">
          <h1 className="place roboto-normal-soapstone-48px">{place}</h1>
        </div>
      </div>
    </div>
  );
}

const checkOutData = {
    checkout: "",
    untitledDesign20210310T1817021: "",
    untitledDesign20210310T1819381: "",
    text1: "Thanks for Your Order!",
    text2: <>Rate your experience with<br />        &lt;Vendor name&gt;</>,
    untitledDesign20210317T1538111: "",
    submit: "Submit",
    line9: "",
    writeAReview: "Write a Review",
    place: " Home",
};


import React from 'react';
import './homePage.css';



function App() {
  return <HomePage {...homePageData} />;
}

export default App;

function HomePage(props) {
  const {
    homepage,
    rectangle9,
    ellipse1,
    address,
    address2,
    address3,
    address4,
    fancyTruck3,
    address5,
    fancyTruck22,
    address6,
    jamesTruck,
    searchALocation,
    untitledDesign20210303T1912562,
    untitledDesign20210303T1912568,
    untitledDesign20210303T1912569,
    untitledDesign20210303T19125612,
    untitledDesign20210303T19125610,
    untitledDesign20210303T1912563,
    untitledDesign20210303T1912564,
    address7,
    address8,
    fancyTruck32,
    untitledDesign20210303T19125611,
    untitledDesign20210310T1032552,
    untitledDesign20210310T1735541,
    untitledDesign20210310T1811463,
    spanText,
    spanText2,
    untitledDesign20210303T1912561,
    coolTruck,
    address9,
    address10,
    address11,
  } = props;

  return (
    <div class="container-center-horizontal">
      <div className="homepage screen" style={{ backgroundImage: `url(${homepage})` }}>
        <div className="overlap-group">
          <img className="rectangle-9" src={rectangle9} />
          <img className="ellipse-1" src={ellipse1} />
          <div className="rectangle-12"></div>
          <div className="rectangle-13"></div>
          <div className="rectangle-14"></div>
          <div className="address-2 robotocondensed-regular-normal-black-20px">{address}</div>
          <div className="address-3 robotocondensed-bold-black-20px">{address2}</div>
          <div className="address-8 robotocondensed-bold-black-20px">{address3}</div>
          <div className="address-5 robotocondensed-bold-black-20px">{address4}</div>
          <h1 className="title robotocondensed-regular-normal-black-36px">{fancyTruck3}</h1>
          <div className="address-7 robotocondensed-regular-normal-black-20px">{address5}</div>
          <div className="fancy-truck robotocondensed-regular-normal-black-36px">{fancyTruck22}</div>
          <div className="address-6 robotocondensed-regular-normal-black-20px">{address6}</div>
          <div className="james-truck robotocondensed-regular-normal-black-36px">{jamesTruck}</div>
          <div className="rectangle-16"></div>
          <div className="search-a-location">{searchALocation}</div>
          <img className="untitled-design-03-03-t191256-2" src={untitledDesign20210303T1912562}  />
          <img className="untitled-design-03-03-t191256-8" src={untitledDesign20210303T1912568} />
          <img className="untitled-design-03-03-t191256-9" src={untitledDesign20210303T1912569} />
          <img className="untitled-design-3-03-t191256-12" src={untitledDesign20210303T19125612} />
          <img className="untitled-design-3-03-t191256-10" src={untitledDesign20210303T19125610} />
          <img className="untitled-design-03-03-t191256-3" src={untitledDesign20210303T1912563} />
          <img className="untitled-design-03-03-t191256-4" src={untitledDesign20210303T1912564} />
          <div className="rectangle-17"></div>
          <div className="address-4 robotocondensed-regular-normal-black-20px">{address7}</div>
          <div className="address-9 robotocondensed-bold-black-20px">{address8}</div>
          <div className="fancy-truck-1 robotocondensed-regular-normal-black-36px">{fancyTruck32}</div>
          <img className="untitled-design-3-03-t191256-11" src={untitledDesign20210303T19125611} />
          <img className="untitled-design-03-10-t103255-2" src={untitledDesign20210310T1032552} />
          <img className="untitled-design-03-10-t173554-1" src={untitledDesign20210310T1735541} />
          <img className="untitled-design-03-10-t181146-3" src={untitledDesign20210310T1811463} />
        </div>
        <div className="overlap-group2">
          <div className="text-1">
            <span className="span0 ">{spanText}</span>
            <span className="span1 ">{spanText2}</span>
          </div>
        </div>
        <div className="overlap-group1">
          <div className="flex-row">
            <img className="untitled-design-03-03-t191256-1" src={untitledDesign20210303T1912561} />
            <div className="cool-truck robotocondensed-regular-normal-black-36px">{coolTruck}</div>
            <div className="address robotocondensed-bold-black-20px">{address9}</div>
          </div>
          <div className="overlap-group3">
            <div className="address-1 robotocondensed-regular-normal-black-18px">{address10}</div>
            <div className="address-1 robotocondensed-regular-normal-black-18px">{address11}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const homePageData = {
    homepage: "",
    rectangle9: "",
    ellipse1: "",
    address: "242 St Kilda Rd, St Kilda VIC 3182",
    address2: "20 km",
    address3: "6 km",
    address4: "9 km",
    fancyTruck3: "Fancy Truck",
    address5: "242 St Kilda Rd, St Kilda VIC 3182",
    fancyTruck22: "Fancy Truck",
    address6: "242 St Kilda Rd, St Kilda VIC 3182",
    jamesTruck: "Jame’s  Truck",
    searchALocation: "Search a location",
    untitledDesign20210303T1912562: "",
    untitledDesign20210303T1912568: "",
    untitledDesign20210303T1912569: "",
    untitledDesign20210303T19125612: "",
    untitledDesign20210303T19125610: "",
    untitledDesign20210303T1912563: "",
    untitledDesign20210303T1912564: "",
    address7: "242 St Kilda Rd, St Kilda VIC 3182",
    address8: "21 km",
    fancyTruck32: "Fancy Truck",
    untitledDesign20210303T19125611: "",
    untitledDesign20210310T1032552: "",
    untitledDesign20210310T1735541: "",
    untitledDesign20210310T1811463: "",
    spanText: "Available Trucks in ",
    spanText2: "Melbourne",
    untitledDesign20210303T1912561: "",
    coolTruck: "Cool Truck",
    address9: "1 km",
    address10: "250 Lower Heidelberg Rd, Fairfield VIC 3079",
    address11: "250 Lower Heidelberg Rd, Fairfield VIC 3079",
};

// button example

<button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='http://google.com';
      }}
> Click here </button>
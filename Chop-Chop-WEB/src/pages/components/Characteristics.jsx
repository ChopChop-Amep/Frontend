import { useState, useRef, useEffect } from "react";
import {Range} from 'react-range';
import "./Characteristics.css";

const MIN = 0;
const MAX = 10000;

export default function Characteristics() {
  const [open, setOpen] = useState([false, false, false, false]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  const containerRef = useRef(null);
  // Preu Rang 
  const [priceRange, setPriceRange] = useState([MIN, MAX]);

  const toggle = (index) => {
    setOpen((prev) => prev.map((v, i) => (i === index ? !v : false)));
  };

  const labels = ["Status", "Stars", "Sort by", "Price Range"];

  const checkboxOptions = {
    Status: ["nou", "com_nou", "usat", "amb_defectes", "per_recanvis"],
    Stars: ["1", "2", "3", "4", "5"],
    "Sort by": ["Price ascendent", "Price descendent"],
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen([false, false, false]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Redirigir cuando se selecciona una opción o rango de precio
  // Solo redirige al soltar el slider (on final change)
  const [sliderActive, setSliderActive] = useState(false);

  useEffect(() => {
    if (!sliderActive) return;
    const hasCheckboxes =
      Object.values(selectedCheckboxes).some(arr => arr && arr.length > 0);
    const priceChanged = priceRange[0] !== MIN || priceRange[1] !== MAX;

    if (selectedOrder || hasCheckboxes || priceChanged) {
      const params = new URLSearchParams();
      if (selectedOrder) params.append("order", selectedOrder);
      Object.entries(selectedCheckboxes).forEach(([key, arr]) => {
        if (arr && arr.length > 0) {
          params.append(key, arr.join(","));
        }
      });
      if (priceChanged) {
        params.append("minPrice", priceRange[0]);
        params.append("maxPrice", priceRange[1]);
      }
      window.location.href = `/selected?${params.toString()}`;
    }
    // Reset sliderActive after redirect
    // eslint-disable-next-line
  }, [sliderActive]);

  // Redirige inmediatamente al cambiar checkboxes o sort
  useEffect(() => {
    if (sliderActive) return;
    const hasCheckboxes =
      Object.values(selectedCheckboxes).some(arr => arr && arr.length > 0);
    const priceChanged = priceRange[0] !== MIN || priceRange[1] !== MAX;

    if (selectedOrder || hasCheckboxes || priceChanged) {
      const params = new URLSearchParams();
      if (selectedOrder) params.append("order", selectedOrder);
      Object.entries(selectedCheckboxes).forEach(([key, arr]) => {
        if (arr && arr.length > 0) {
          params.append(key, arr.join(","));
        }
      });
      if (priceChanged) {
        params.append("minPrice", priceRange[0]);
        params.append("maxPrice", priceRange[1]);
      }
      window.location.href = `/selected?${params.toString()}`;
    }
    // eslint-disable-next-line
  }, [selectedOrder, selectedCheckboxes]);

  // Cambia el sliderActive solo al soltar el slider
  const handleSliderFinalChange = (values) => {
    setPriceRange(values);
    setSliderActive(true);
  };

  return (
    <div className="dropdown-container" ref={containerRef}>
      {labels.map((label, i) => (
        <div key={i} className="dropdown">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toggle(i);
            }}
            className="dropdown-link-CH"
          >
            {label}
          </a>
          {open[i] && (
            <div className="dropdown-content-CH">
              {label === "Price Range" ? (
                <div style={{ padding: "1rem" }}>
                  <Range
                    step={0.1}
                    min={MIN}
                    max={MAX}
                    values={priceRange}
                    onChange={(values) => setPriceRange(values)}
                    onFinalChange={handleSliderFinalChange}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "4px",
                          width: "100%",
                          backgroundColor: "#ccc",
                          marginTop: "1rem",
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "20px",
                          width: "20px",
                          borderRadius: "50%",
                          backgroundColor: "black",
                          cursor: "pointer",
                        }}
                      />
                    )}
                  />
                  <div style={{ marginTop: "1rem", textAlign: "center" }}>
                    {priceRange[0].toFixed(2)} EUR -{" "}
                    {priceRange[1].toFixed(2)} EUR
                  </div>
                </div>
              ) : label === "Sort by"
                ? checkboxOptions[label].map((option, j) => (
                    <label
                      key={j}
                      style={{
                        textAlign: "left",
                        display: "block",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <input
                        type="radio"
                        name="order"
                        value={option}
                        checked={selectedOrder === option}
                        onChange={() => {
                          setSelectedOrder(
                            selectedOrder === option ? "" : option
                          );
                        }}
                      />
                      {option}
                    </label>
                  ))
                : checkboxOptions[label].map((option, j) => (
                    <label
                      key={j}
                      style={{
                        textAlign: "left",
                        display: "block",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <input
                        type="checkbox"
                        name={label}
                        value={option}
                        checked={
                          selectedCheckboxes[label]?.includes(option) || false
                        }
                        onChange={() => {
                          setSelectedCheckboxes((prev) => {
                            const prevOptions = prev?.[label] || [];
                            if (prevOptions.includes(option)) {
                              // Deselect
                              return {
                                ...prev,
                                [label]: prevOptions.filter(
                                  (o) => o !== option
                                ),
                              };
                            } else {
                              // Select
                              return {
                                ...prev,
                                [label]: [...prevOptions, option],
                              };
                            }
                          });
                        }}
                      />{" "}
                      {option}
                    </label>
                  ))} 
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

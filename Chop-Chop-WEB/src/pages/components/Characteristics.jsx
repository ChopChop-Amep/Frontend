import { useState, useRef, useEffect } from "react";
import "./Characteristics.css";

export default function Characteristics() {
  const [open, setOpen] = useState([false, false, false]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  const containerRef = useRef(null);

  const toggle = (index) => {
    setOpen((prev) => prev.map((v, i) => (i === index ? !v : false)));
  };

  const labels = ["Status", "Stars", "Sort by"];

  const checkboxOptions = {
    Status: ["nou", "poc usat", "usat"],
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

  // Redirigir cuando se selecciona una opción
  useEffect(() => {
    // Si hay alguna selección, redirige
    const hasCheckboxes =
      Object.values(selectedCheckboxes).some(arr => arr && arr.length > 0);
    if (selectedOrder || hasCheckboxes) {
      // Puedes personalizar la ruta y cómo pasas los datos seleccionados
      const params = new URLSearchParams();
      if (selectedOrder) params.append("order", selectedOrder);
      Object.entries(selectedCheckboxes).forEach(([key, arr]) => {
        if (arr && arr.length > 0) {
          params.append(key, arr.join(","));
        }
      });
      window.location.href = `/selected?${params.toString()}`;
    }
  }, [selectedOrder, selectedCheckboxes]);

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
              {label === "Sort by"
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

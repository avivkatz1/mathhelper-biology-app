// can the
/* if the attribute == Color, then instead of numbers it should shift to different colors ['white', 'black', 'red', 'blue', 'green','brown','yellow',] */

import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { createCreature } from "../store/biologySlice";
import { addCreature } from "../api/bioContext";
import { useNavigate } from "react-router-dom";
const CreatureCreation = () => {
  const { username, password } = useSelector((state) => state.biology.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [features, setFeatures] = useState({
    fur: false,
    wings: false,
    claws: false,
    tail: false,
    horn: false,
    shell: false,
    feathers: false,
    sharpTeeth: false,
  });

  const colors = ["white", "grey", "black", "red", "blue", "green", "brown", "yellow"];

  const [attributes, setAttributes] = useState({
    color: 0,
    numberOfLegs: 0,
    numberOfEyes: 0,
    litterSize: 1,
    weight: 1,
    height: 1,
    speed: 1,
    intelligence: 60,
  });

  const handleFeatureChange = (e) => {
    const { name, checked } = e.target;
    setFeatures({ ...features, [name]: checked });
  };

  const handleAttributeChange = (e) => {
    const { name, value } = e.target;
    setAttributes({ ...attributes, [name]: Number(value) });
  };

  const FeatureRow = styled.div`
    display: flex;
    margin-bottom: 20px;
  `;

  const FeatureColumn = styled.div`
    flex: 1;
    padding: 0 10px;
  `;

  const AttributeRow = styled.div`
    display: flex;
    margin-bottom: 20px;
  `;

  const AttributeColumn = styled.div`
    flex: 1;
    padding: 0 10px;
  `;

  return (
    <Container>
      <Section className="feature-label">
        <h2>Select Features</h2>
        <FeatureRow>
          {Object.keys(features)
            .slice(0, 4)
            .map((feature) => (
              <FeatureColumn key={feature}>
                <label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name={feature}
                    checked={features[feature]}
                    onChange={handleFeatureChange}
                  />
                  {feature}
                </label>
              </FeatureColumn>
            ))}
        </FeatureRow>
        <FeatureRow>
          {Object.keys(features)
            .slice(4)
            .map((feature) => (
              <FeatureColumn key={feature}>
                <label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name={feature}
                    checked={features[feature]}
                    onChange={handleFeatureChange}
                  />
                  {feature.replace(/([A-Z])/g, " $1").toLowerCase()}
                </label>
              </FeatureColumn>
            ))}
        </FeatureRow>
      </Section>
      <Section>
        <h2>Set Attributes</h2>
        <AttributeRow>
          {Object.keys(attributes)
            .slice(0, 4)
            .map((attribute) => {
              if (attribute.toLowerCase() === "color") {
                // also change the color of the slider to mathch the selected color
                return (
                  <AttributeColumn key={attribute}>
                    <label
                      style={{
                        borderColor: "black",
                        borderWidth: "2px",
                        borderStyle: "solid",
                        backgroundColor: colors[attributes[attribute]],
                        padding: "5px",
                        borderRadius: "5px",
                        color:
                          colors[attributes[attribute]] === "black" ||
                          colors[attributes[attribute]] === "blue"
                            ? "white"
                            : "black",
                      }}
                    >
                      {attribute}: {colors[attributes[attribute]]}
                      <input
                        style={{
                          accentColor:
                            colors[attributes[attribute]] === "white" ||
                            colors[attributes[attribute]] === "yellow"
                              ? "black"
                              : "white",
                        }}
                        className="slider"
                        type="range"
                        name={attribute}
                        min="0"
                        max={colors.length - 1}
                        value={attributes[attribute]}
                        onChange={handleAttributeChange}
                      />
                    </label>
                  </AttributeColumn>
                );
              } else {
                return (
                  <AttributeColumn key={attribute}>
                    <label>
                      {/* split the word at each capital letter */}
                      {attribute.replace(/([A-Z])/g, " $1").toLowerCase()}: {attributes[attribute]}
                      <input
                        className="slider"
                        type="range"
                        name={attribute}
                        min={attribute === "litterSize" ? "1" : "0"}
                        max={
                          attribute === "litterSize"
                            ? "20"
                            : attribute == "numberOfLegs"
                              ? "8"
                              : "10"
                        }
                        value={attributes[attribute]}
                        onChange={handleAttributeChange}
                      />
                    </label>
                  </AttributeColumn>
                );
              }
            })}
        </AttributeRow>
        <AttributeRow>
          {Object.keys(attributes)
            .slice(4)
            .map((attribute) => (
              <AttributeColumn key={attribute}>
                <label>
                  {attribute.replace(/([A-Z])/g, " $1").toLowerCase()}: {attributes[attribute]}
                  {attribute === "weight" && attributes[attribute] == "1"
                    ? " lb"
                    : attribute === "weight"
                      ? " lbs"
                      : attribute === "height"
                        ? " ft"
                        : attribute === "intelligence"
                          ? " animal IQ"
                          : " mph"}
                  <input
                    className="slider"
                    type="range"
                    name={attribute}
                    min={
                      attribute === "weight" || attribute === "height"
                        ? "1"
                        : attribute == "intelligence"
                          ? "60"
                          : "0"
                    }
                    max={
                      attribute == "intelligence"
                        ? "140"
                        : attribute == "weight"
                          ? "2000"
                          : attribute == "height"
                            ? "20"
                            : "70"
                    }
                    value={attributes[attribute]}
                    onChange={handleAttributeChange}
                  />
                </label>
              </AttributeColumn>
            ))}
        </AttributeRow>
      </Section>
      {/* add button for submit */}
      <button
        onClick={() => {
          const creatureData = {
            features,
            createdBy: username + password,
            attributes: {
              ...attributes,
              color: colors[attributes.color], // convert color index to color name
            },
          };
          addCreature(creatureData);
          dispatch(createCreature(creatureData));
          navigate("/biology/evolutionSimulator/viewcreature");
        }}
      >
        Create Creature
      </button>
    </Container>
  );
};

export default CreatureCreation;

// can the value for slider be shown underneath the slider itself

const Container = styled.div`
  padding: 20px;
  .feature-label {
    font-size: 20px;
    display: block;
    margin-bottom: 10px;
  }
  .checkbox {
    transform: scale(1.5);
    margin-right: 10px;
  }
  .slider {
    margin-top: 10px;
    /* make the value show underneath the slider itself */
  }
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const FeatureLabel = styled.label`
  font-size: 18px;
  display: block;
  margin-bottom: 10px;
`;

const AttributeLabel = styled.label`
  font-size: 18px;
  display: block;
  margin-bottom: 10px;
`;

const Checkbox = styled.input`
  transform: scale(1.5);
  margin-right: 10px;
`;
const Slider = styled.input`
  width: 100%;
  transform: scale(1.5);
  margin-top: 10px;
`;

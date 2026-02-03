// this will have a description of the creature created
// This will have two main sections: Image which should take up 70% of the top of the page
// and below it the creature's features and attributes displayed in a clean format
// this will get the features and attributes from the biologyslice store, under user, under creatures, it
// will get the last creature in the list and display its data.
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import backgroundImage from "../images/creature.png";
import creatureImage from "../images/creature.png";

const ViewCreature = () => {
  const creature = useSelector((state) => {
    const creatures = state.biology.user.creatures;
    return creatures.length > 0 ? creatures[creatures.length - 1] : null;
  });
  if (!creature) {
    return <Message>No creature data available.</Message>;
  }

  return (
    <Container>
      <ImageSection>
        <img src={creatureImage} alt="Creature Image" />
      </ImageSection>
      <InfoSection>
        <div>
          <SectionTitle>Features</SectionTitle>
          <FeatureList>
            {Object.entries(creature.features).map(([feature, hasFeature]) => (
              <FeatureItem key={feature}>
                {feature.charAt(0).toUpperCase() + feature.slice(1)}: {hasFeature ? "Yes" : "No"}
              </FeatureItem>
            ))}
          </FeatureList>
        </div>
        <div>
          <SectionTitle>Attributes</SectionTitle>
          <AttributeList>
            {Object.entries(creature.attributes).map(([attribute, value]) => (
              <AttributeItem key={attribute}>
                {attribute.charAt(0).toUpperCase() + attribute.slice(1)}: {value}
              </AttributeItem>
            ))}
          </AttributeList>
        </div>
      </InfoSection>
    </Container>
  );
};

export default ViewCreature;

const Container = styled.div`
  border-radius: 10px;
  border: 2px solid black;
  width: 60%;
  align-items: center;
  padding: 20px;
  background-color: #ce9e9eff;
`;

const ImageSection = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 50%;

    border-radius: 10px;
    border: 2px solid black;
  }
`;

const CreatureImage = styled.div`
  width: 100%;
  height: 100%;

  /* background-color: ${(props) => props.color || "gray"}; */
  background: url(${backgroundImage}) no-repeat center center fixed;
  border-radius: 10px;
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: space-around;
`;
const SectionTitle = styled.h2`
  margin-bottom: 10px;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px;
`;

const FeatureItem = styled.li`
  margin-bottom: 5px;
`;

const AttributeList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const AttributeItem = styled.li`
  margin-bottom: 5px;
`;

const Message = styled.p`
  font-size: 18px;
  color: red;
`;

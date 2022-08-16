import React from "react";
import styled from "styled-components";
import Head from "./head";
import Offerings from "./offerings";
import TestimonialsSlider from "./testimonials-slider";
import Quality from "./quality";
import AddFine from "./add-fine";

const WhiskeyVestPage = () => (
    <Container>
        <Head />
        <Offerings />
        <TestimonialsSlider />
        <Quality />
        <AddFine />
    </Container>
);

const Container = styled.div`
    background-color: #efddc7;
`;

export default WhiskeyVestPage;

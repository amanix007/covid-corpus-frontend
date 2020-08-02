import React from "react";
import { Box, Typography } from '@material-ui/core';

const AboutUs = () => {
  return (
    <React.Fragment>
      <div className="col-12 col-sm-12 col-md-8 offset-md-2">
      <div className="dk-page-title">About COVID CORPUS</div>
        <Box pt={2} align="justify">
          <p>
            COVID-19 COllaborative Research Portal and knowledge Utility System
            (COVID CORPUS)
          </p>
          <p>
            COVID CORPUS is a one-stop repository and portal of COVID-19
            research activity, funding and other resources which fulfils the
            following functions:
            <ul style={{ listStyleType: "lower-roman" }}>
              <li>
                Signposting of on-going research activity: Provide a database of
                all on-going COVID-19 related research projects (fundamental
                sciences, systematic reviews, observational studies, clinical
                trials) to avoid duplication, and to facilitate coordination and
                collaboration, by COVID- 19 researchers and clinicians.
              </li>
              <li>
                Evidence mapping and gap analysis: Map the evidence and identify
                and publish gaps in research activity to help direct future
                research and research funding.
              </li>
              <li>
                Facilitating coordination, networking and collaboration, and
                avoiding duplication, by COVID-19 researchers and clinicians.
              </li>
            </ul>
          </p>
          <p>
            The on-line portal is curated and administered by volunteer experts
            from the academic and clinical global community. Users will be able
            to upload their own contributions, which will be approved and
            published immediately by the curation team. Users will also be
            provided with a suite of analytical tools including statistical
            tools, advanced AI based text and data analytical tools, and
            visualization tools. They will also be provided with professional
            networking functionalities to facilitate collaboration.
          </p>
        </Box>
      </div>
    </React.Fragment>
  );
};

export default AboutUs;

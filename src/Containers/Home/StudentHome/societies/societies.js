import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import WrapperComponent from "../../../../FooterAndHeaderwrapper";
import AnimationNumbers from '../../../../Components/animaterNumbers/animatednumbers';
function SocietiesPage() {
    const societies = [
        {
            name: "Engineering Society",
            description: "The Engineering Society aims to foster innovation and creativity among students interested in engineering fields. We organize workshops, seminars, and competitions to enhance technical skills and promote collaboration.",
            image: "engineering.jpg" // Assuming you have images in your project directory
        },
        {
            name: "Literature Club",
            description: "The Literature Club is a vibrant community of book lovers and aspiring writers. We host book readings, poetry slams, and writing workshops to celebrate the beauty of language and storytelling.",
            image: "literature.jpg" // Assuming you have images in your project directory
        },
        // Add more societies as needed
    ];

    return (
        <WrapperComponent>
            <div style={{ padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Explore University Societies
                </Typography>
                <Typography variant="body1" paragraph>
                    Discover the diverse range of societies available at our university. With over 15 societies to choose from, there's something for everyone.
                </Typography>
                <Grid container spacing={2}>
                    {societies.map((society, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <img src={society.image} alt={society.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {society.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {society.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <AnimationNumbers />
            </div>
        </WrapperComponent>
    );
};

export default SocietiesPage;

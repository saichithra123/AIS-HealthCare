import { Box, Grid2, MenuItem, Select, TextField, Typography, useTheme, FormControl } from '@mui/material'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '../adminStyles.css'
import dayjs from "dayjs";

const ProductForm = ({ productDetails, setProductDetails }) => {
    const theme = useTheme();
    const location = useLocation();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({
            ...productDetails,
            [name]: value,
        });
    };

    return (
        <Box sx={{ "& .MuiTypography-root": { fontSize: "12px", color: theme.palette.colors[21] } }}>
            <Grid2 container spacing={2.5}>
                <Grid2 size={4}>
                    <Typography>Product Name</Typography>
                    <TextField
                        fullWidth
                        size="small"
                        className="inputFields"
                        value={productDetails?.productName}
                        name="productName"
                        onChange={handleInputChange}
                    />
                </Grid2>
                <Grid2 size={4}>
                    <Typography>Product Code</Typography>
                    <TextField
                        size="small"
                        fullWidth
                        value={productDetails?.productCode}
                        className="inputFields"
                        name="productCode"
                        onChange={handleInputChange}
                    />
                </Grid2>
                <Grid2 size={4} className="inputFields">
                    <Typography>Product Category</Typography>
                    <FormControl fullWidth>
                        <Select
                            size="small"
                            fullWidth
                            value={productDetails?.productCategory}
                            className="inputFields"
                            name="productCategory"
                            onChange={handleInputChange}
                        >
                            <MenuItem value="Electronics">Electronics</MenuItem>
                            <MenuItem value="Food and Bewerages">Food and Bewerages</MenuItem>
                            <MenuItem value="Pharmaceuticals">Pharmaceuticals</MenuItem>
                            <MenuItem value="Clothing and Textiles">Clothing and Textiles</MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 size={4}>
                    <Typography>Product Expiry Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            className="inputFields"
                            value={productDetails?.productExpiryDate ? dayjs(productDetails.productExpiryDate) : null}
                            name="productExpiryDate"
                            onChange={(value) =>
                                setProductDetails({
                                    ...productDetails,
                                    productExpiryDate: value,
                                })
                            }
                            format="DD MMM YYYY"
                            sx={{ width: "100%" }}
                        />
                    </LocalizationProvider>
                </Grid2>
                <Grid2 size={4}>
                    <Typography>Batch / Serial Number</Typography>
                    <TextField
                        size="small"
                        fullWidth
                        value={productDetails?.productBatch}
                        className="inputFields"
                        name="productBatch"
                        onChange={handleInputChange}
                    />
                </Grid2>
                <Grid2 size={4}>
                    <Typography>Manufacturer</Typography>
                    <TextField
                        size="small"
                        fullWidth
                        value={productDetails?.productManufacturer}
                        className="inputFields"
                        name="productManufacturer"
                        onChange={handleInputChange}
                    />
                </Grid2>
                <Grid2 size={4}>
                    <Typography>Address</Typography>
                    <TextField
                        size="small"
                        fullWidth
                        value={productDetails?.productAddress}
                        className="inputFields"
                        name="productAddress"
                        onChange={handleInputChange}
                    />
                </Grid2>
                <Grid2 size={8}>
                    <Typography>Description / Notes</Typography>
                    <TextField
                        size="small"
                        fullWidth
                        value={productDetails?.productDescription}
                        className="inputFields"
                        name="productDescription"
                        onChange={handleInputChange}
                    />
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default ProductForm
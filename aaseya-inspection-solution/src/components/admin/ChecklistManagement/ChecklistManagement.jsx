import { Box, Grid2, Typography, useTheme } from '@mui/material';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ChecklistRtlOutlinedIcon from '@mui/icons-material/ChecklistRtlOutlined';
import TemplateIcon from '../../../assets/template.png';
import { useNavigate } from "react-router-dom";
import categoryIcon from '../../../assets/category.svg'
import checklistItemIcon from '../../../assets/checklist-item.svg'
import prechecklistIcon from '../../../assets/pre-checklist.svg'
import templatesIcon from '../../../assets/templates.svg'

const ChecklistManagement = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                borderRadius: "20px",
                background: `${theme.palette.colors[2]} 0% 0% no-repeat padding-box`,
                my: 2,
                mr: 2,
                p: 2.5,
                boxShadow: `inset 0px 0px 6px ${theme.palette.colors[3]}`,
                opacity: 1,
                height: "100%",
            }}
        >
            <Typography variant="h4" fontWeight={600} sx={{ mb: 3 }}>
                Checklist Management
            </Typography>
            <Grid2 container spacing={2.5}>
                <Grid2
                    size={{ xs: 12, md: 6, lg: 3 }}
                    container
                    direction="column"
                    sx={{
                        background: `#ffffff`,
                        boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                        borderRadius: "10px",
                        opacity: 1,
                        p: 3,
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/checklist-management/items")}
                >
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            backgroundColor: "#E6EFF0",
                            width: "60px",
                            height: "60px",
                            borderRadius: "44px",
                        }}
                    >
                        <img src={checklistItemIcon} alt="Checklist Item" />
                    </Box>
                    <Typography variant="h6" fontWeight={600} fontSize={16}>
                        Checklist Item
                    </Typography>
                </Grid2>
                <Grid2
                    size={{ xs: 12, md: 6, lg: 3 }}
                    container
                    direction="column"
                    sx={{
                        background: `#ffffff`,
                        boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                        borderRadius: "10px",
                        opacity: 1,
                        p: 3,
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/checklist-management/category")}
                >
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            backgroundColor: "#E6EFF0",
                            width: "60px",
                            height: "60px",
                            borderRadius: "44px",
                        }}
                    >
                        <img src={categoryIcon} alt="Category" />
                    </Box>
                    <Typography variant="h6" fontWeight={600} fontSize={16}>
                        Category
                    </Typography>
                </Grid2>
                <Grid2
                    size={{ xs: 12, md: 6, lg: 3 }}
                    container
                    direction="column"
                    sx={{
                        background: `#ffffff`,
                        boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                        borderRadius: "10px",
                        opacity: 1,
                        p: 3,
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate(`/checklist-management/template`)}
                >
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            backgroundColor: "#E6EFF0",
                            width: "60px",
                            height: "60px",
                            borderRadius: "44px",
                        }}
                    >
                        <img src={templatesIcon} alt="Templates" />
                    </Box>
                    <Typography variant="h6" fontWeight={600} fontSize={16}>
                        Templates
                    </Typography>
                </Grid2>
                {/* <Grid2
                    size={{ xs: 12, md: 6, lg: 3 }}
                    container
                    direction="column"
                    sx={{
                        background: `#ffffff`,
                        boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                        borderRadius: "10px",
                        opacity: 1,
                        p: 3,
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate(`/checklist-management/form-builder`)}
                >
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            backgroundColor: "#E6EFF0",
                            width: "60px",
                            height: "60px",
                            borderRadius: "44px",
                        }}
                    >
                        <img src={prechecklistIcon} alt="Pre Inspection Checklist" />
                    </Box>
                    <Typography variant="h6" fontWeight={600} fontSize={16} sx={{ textAlign: "center" }}>
                        Form Builder
                    </Typography>
                </Grid2> */}
                <Grid2
                    size={{ xs: 12, md: 6, lg: 3 }}
                    container
                    direction="column"
                    sx={{
                        background: `#ffffff`,
                        boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                        borderRadius: "10px",
                        opacity: 1,
                        p: 3,
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate(`/checklist-management/pre-inspection-checklist`)}
                >
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            backgroundColor: "#E6EFF0",
                            width: "60px",
                            height: "60px",
                            borderRadius: "44px",
                        }}
                    >
                        <img src={prechecklistIcon} alt="Pre Inspection Checklist" />
                    </Box>
                    <Typography variant="h6" fontWeight={600} fontSize={16} sx={{ textAlign: "center" }}>
                        Pre Inspection Checklist
                    </Typography>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default ChecklistManagement;

import React, { useState } from 'react'
import './App.css'
import Layout from './Layout'
import MUIDataTable from 'mui-datatables';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ReactImageMagnify from 'react-image-magnify';
import QRCode from "react-qr-code";
import { PieChart } from 'react-minimal-pie-chart';
import ReactApexChart from 'react-apexcharts';
import { useRef } from 'react';
import { toJpeg } from 'html-to-image';
import { saveAs } from 'file-saver';
export default function Home() {

    const [name, setFname] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [data, setdata] = useState([])
    const [id, setId] = useState('')
    const [img, setImg] = useState([])
    const [modalData, setModalData] = useState([])
    const [motaimg, setMotaimg] = useState()
    const [maths, setMaths] = useState('')
    const [science, setScience] = useState('')
    const [english, setEnglish] = useState('')
    const [open, setOpen] = React.useState(false);
    const [inputText, setInputText] = useState('');
    const [qrCodeText, setQRCodeText] = useState('');

    const handleOpen = (id) => {
        setOpen(true);
        console.log(id)
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                setModalData(data[i])
                setMotaimg(data[i].img[0])
            }
            console.log(modalData)
        }
    }

    const handleImage = (src) => {
        let BigImg = document.getElementsByClassName(('bigImg'))
        BigImg.src = src
        setMotaimg(src)
    }

    const [open2, setOpen2] = React.useState(false);

    const handleOpen2 = () => {
        setOpen2(true);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleClose = () => setOpen(false);
    const columns = [
        {
            name: "name",
            label: "NAME",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "email",
            label: "EMAIL",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "pass",
            label: "PASSWORD",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "id",
            label: "id",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "maths",
            label: "MATHS",
            options: {
                filter: true,
                sort: false,
            }
        }, {
            name: "science",
            label: "SCIENCE",
            options: {
                filter: true,
                sort: false,
            }
        }, {
            name: "english",
            label: "ENGLISH",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "img",
            label: "IMAGE",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <img src={value[0]} />

                )
            }
        },
        {
            name: "EDIT",
            label: "EDIT",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <Button variant="outlined" color="success" onClick={() => handleEditItem(tableMeta)} > Edit   </Button>

                )

            }
        },

        {
            name: "id",
            label: "DELETE",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <Button variant="outlined" color="error" onClick={() => handledelete(value)} > DELETE   </Button>

                )

            }
        },


        {
            name: "id",
            label: "VIEW",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <Button variant="outlined" color="success" onClick={() => handleOpen(value)}>view</Button>
                )

            }
        },
    ];

    const options = {
        filterType: 'checkbox'
    };


    const muiCache = createCache({
        key: 'mui-datatables',
        prepend: true
    })


    const handledelete = (id) => {
        const filteredPeople = data.filter((item) => item.id !== id);
        setdata(filteredPeople)
        console.log(filteredPeople)
    }



    const handletext = (e) => {
        setFname(e.target.value)
    }

    const handleemail = (e) => {
        setEmail(e.target.value)
    }

    const handlepass = (e) => {
        setPass(e.target.value)
    }

    const handlemaths = (e) => {
        setMaths(e.target.value)
    }
    const handlesci = (e) => {
        setScience(e.target.value)
    }
    const handleenglish = (e) => {
        setEnglish(e.target.value)
    }

    const submit = (e) => {

        let obj = {
            name: name,
            email: email,
            pass: pass,
            maths: maths,
            science: science,
            english: english,
            img: img,
            abc: img,
            id: Date.now()
        }

        setdata([...data, obj])
        setPass('')
        setEmail('')
        setFname('')
        setMaths('')
        setScience('')
        setEnglish('')
        setId('')
        setImg([])
        console.log(data)

    }

    const handleSubmit = () => {
        let editKarvanuChhe = false;

        const updatedData = data.map((item) => {
            if (item.id === id) {
                editKarvanuChhe = true;
                return {
                    ...item,
                    editKarvanuChhe: true,
                };
            }
            return item;
        });

        if (editKarvanuChhe) {
            update(updatedData);
        } else {
            submit();
        }
    };

    const handleRemoveItem = (id) => {

        setdata(data.filter(item => item.id !== id));
    };



    const handleEditItem = (tableMeta) => {
        setFname(tableMeta.rowData[0]);
        setEmail(tableMeta.rowData[1]);
        setPass(tableMeta.rowData[2]);
        setImg(tableMeta.rowData[7])
        setId(tableMeta.rowData[3])
        setMaths(tableMeta.rowData[4]);
        setScience(tableMeta.rowData[5]);
        setEnglish(tableMeta.rowData[6]);

        let objIndex = data.findIndex((obj => obj.id == tableMeta.rowData));

    };




    const removeimg = (id) => {
        setImg(img.filter(item => item !== id));

    }

    // let oa = []
    // const handleChange = (e) => {
    //     for (let i = 0; i < e.target.files.length; i++) {

    //         oa.push(URL.createObjectURL(e.target.files[i]));
    //     }
    //     console.log(oa)
    //     setImg(oa)
    // }


    const handleImageUpload = (event) => {
        const files = event.target.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = e.target.result;
                setImg((prevImages) => [...prevImages, img]);
            };

            reader.readAsDataURL(file);
        }
    };


    const update = () => {


        let objIndex = data.findIndex((item => item.id === id));

        data[objIndex].name = name
        data[objIndex].email = email
        data[objIndex].pass = pass
        data[objIndex].img = img
        data[objIndex].maths = maths
        data[objIndex].science = science
        data[objIndex].english = english

        console.log(objIndex)

        setdata([...data])
        setPass('')
        setEmail('')
        setFname('')
        setId('')
        setImg([])
        setMaths('')
        setScience('')
        setEnglish('')
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const stylee = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex'

    };




    const series = [Number(modalData.maths), Number(modalData.science), Number(modalData.english)];
    const optionsss = {
        chart: {
            type: 'donut',
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200,
                },
                legend: {
                    position: 'bottom',
                },
            },
        }],

    }

    const qrCodeRef = useRef('https://decodesofttech.com');
    const downloadQRCode = () => {
        const qrCodeElement = qrCodeRef.current;

        toJpeg(qrCodeElement)
            .then((dataUrl) => {
                saveAs(dataUrl, 'qrcode.jpg');
            })
            .catch((error) => {
                console.error('Error generating QR code image:', error);
            });
    }



    // const mk = name !== '' && email != '' && pass !== '';


    return (
        <Layout>
            <div className='container mt-5 '>
                <blockquote>
                    NAME : <input type='text' onChange={handletext} value={name} /><br /><br></br>
                    EMAIL: <input type='email' onChange={handleemail} value={email} /><br /><br></br>
                    PASSWORD: <input type='password' onChange={handlepass} value={pass} /><br /><br></br>
                    MATHS : <input type='number' onChange={handlemaths} value={maths} /><br /><br></br>
                    SCIENCE : <input type='number' onChange={handlesci} value={science} /><br /><br></br>
                    ENGLISH : <input type='number' onChange={handleenglish} value={english} /><br /><br></br>

                    <input type="file" id='file' multiple onChange={handleImageUpload} /><br /><br></br>
                    {
                        img.map((item) => {
                            return (
                                <>
                                    <img src={item} />
                                    <button name={item.img} onClick={() => removeimg(item)}>X</button>
                                </>
                            )
                        })
                    }
                    <br /><br></br>

                    <Button variant="outlined" color="success" onClick={handleSubmit}>submit</Button><br /><br></br>


                    {/* <table className='mt-5' >
                        <th >Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>id</th>
                        <th>Remove</th>
                        <th>Edit</th>
                        <th>Image</th>

                        { {
                            data.map((item, i) => {
                                return (
                                    <tr >
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                        <td>{item.pass}</td>
                                        <td>{item.id}</td>
                                        <td>  <button name={item.id} onClick={() => handleRemoveItem(item.id)}> .....X.....  </button></td>
                                        <td>  <button onClick={() => handleEditItem(item, item.id)} > Edit   </button></td>

                                        <td>
                                        <img style={{ width: '200px' }} src={item.img[i]} />{ }
                                        </td>
                                        </tr>
                                        )
                                    })
                                } }
                            </table> */}
                    <div style={{ maxWidth: '100%' }}>
                        <CacheProvider value={muiCache}>
                            <ThemeProvider theme={createTheme()}>
                                <MUIDataTable
                                    columns={columns}
                                    data={data}
                                    title='Customer Data'
                                    options={options}
                                    img={img}
                                />
                            </ThemeProvider>
                        </CacheProvider>

                    </div>


                    <div>

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Customer data
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div>

                                        {/* <img src={modalData.img && modalData.img[0]} id='bigImg' style={{ maxWidth: '200px', maxHeight: '200px', marginLeft: '20%' }} alt="" /><br></br> */}

                                        <div id="img"     >
                                            <ReactImageMagnify
                                                // {...props}
                                                {...{
                                                    smallImage: {
                                                        alt: "Wristwatch by Ted Baker London",
                                                        isFluidWidth: true,
                                                        className: 'bigImg',
                                                        src: (motaimg),


                                                    },
                                                    largeImage: {
                                                        src: (motaimg),
                                                        width: 1200,
                                                        height: 1800
                                                    },
                                                    enlargedImageContainerStyle: {
                                                        zIndex: "1500",

                                                    },
                                                    enlargedImageContainerDimensions: {
                                                        width: "100%",
                                                        height: "100%",
                                                    },
                                                }}
                                            />
                                        </div>


                                        {modalData.img && modalData.img.map((item) => {
                                            return (
                                                <img src={item} alt="" onClick={() => handleImage(item)} style={{ maxWidth: '90px', maxHeight: '90px', margin: "4px" }} />
                                            )
                                        })}

                                        <br></br>

                                        NAME:<h4>{modalData.name}</h4><br></br>
                                        EMAIL:<h4>{modalData.email}</h4><br></br>
                                        PASSWORD:<h4>{modalData.pass}</h4><br></br>
                                        maths:<h4>{modalData.maths}</h4><br></br>
                                        science:<h4>{modalData.science}</h4><br></br>
                                        english:<h4>{modalData.english}</h4><br></br>

                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                        <Button onClick={handleClose} variant="outlined" color="error"> CLOSE </Button>
                                        <Button style={{ marginLeft: '5px' }} variant="outlined" color="success" onClick={handleOpen2}>Open Child Modal</Button>
                                    </div>
                                </Typography>


                                <Modal
                                    open={open2}
                                    onClose={handleClose2}
                                    aria-labelledby="child-modal-title"
                                    aria-describedby="child-modal-description"
                                >
                                    <Box sx={{ ...stylee, width: 500 }} >
                                        {console.log(modalData)}
                                        <div>
                                            {<QRCode value={JSON.stringify(modalData)} ref={qrCodeRef} style={{ width: '150px', height: '150px' }} />}
                                            <Button variant="outlined" color="primary" onClick={downloadQRCode}>Download QR Code</Button>
                                            <br></br><br></br>
                                            NAME:   <h4>{modalData.name}</h4><br></br>
                                            STUDENT ID:   <h4>{modalData.id}</h4><br></br>
                                        </div>
                                        <div >
                                            <div id="chart">
                                                <ReactApexChart options={optionsss} series={series} type="donut" />
                                            </div>
                                            <Button variant="outlined" color="error" style={{ margin: '15px' }} onClick={handleClose2}>Close</Button>
                                        </div>
                                    </Box>
                                </Modal>
                            </Box>
                        </Modal>



                    </div>

                </blockquote>
            </div >


        </Layout >

    )
}


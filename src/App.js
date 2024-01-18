import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, DatePicker, Form, Input, Modal, Row, Select, Space, Upload, message } from 'antd';
import Meta from 'antd/es/card/Meta';
import Search from 'antd/es/input/Search';
import { UploadOutlined } from '@ant-design/icons';

function App() {

  let {Item}= Form
  const [form] = Form.useForm()

  const FilterOptions=[
    {
      value:'priceLtoH',
      label:'Price Lowest to Highest'
    },
    {
      value:'priceHtoL',
      label:'Price Highest to Lowest'
    },
    {
      value:'petrol',
      label:'Petrol Vehicle'
    },
    {
      value:'diesel',
      label:'Diesel Vehicle'
    },
    {
      value:'dateWise',
      label:'Manufactured Year'
    },
    {
      value:'kmsRun',
      label:'Total KM'
    },
  ]

  const AvailabilityOptions=[
    {
      value:false,
      label:'Yes'
    },
    {
      value:true,
      label:'No'
    },
  ]
  const FuelTypesOptions=[
    {
      value:'petrol',
      label:'Petrol'
    },
    {
      value:'diesel',
      label:'Diesel'
    },
  ]

  let reqRules = [
    {
      required: true,
      message: 'field is required',
    },
  ]
  let alphaRules = [
    {
      required: true,
      message: 'field is required',
    },
    {
      pattern: new RegExp(/^[a-zA-Z][a-zA-Z\s]*$/),
      message: "only alphabets"
    },
  ]
  let numRules = [
    {
      required: true,
      message: 'field is required',
    },
    {
      pattern: new RegExp(/^[0-9]+$/),
      message: "only alphabets"
    },
  ]

  let ImageProps= {
    name: 'file',
    multiple: false,
    maxCount: 1,
    accept:"image/*",
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {authorization: 'authorization-text'}
  }

  const [InitialData, setInitialData]=useState([])
  const [Data, setData]=useState([])
console.log(Data)
  const [SearchValue, setSearchValue]=useState(undefined)
  const [SelectValue, setSelectValue]=useState(undefined)
  const [UploadCarModal, setUploadCarModal] = useState(false)
  const [MakeValue, setMakeValue] = useState(undefined)
  const [ModelValue, setModelValue] = useState(undefined)
  const [AvailableValue, setAvailableValue] = useState(undefined)
  const [FuelTypeValue, setFuelTypeValue] = useState(undefined)
  const [ForDatePicker, setForDatePicker] =  useState(undefined)
  const [DateYearValue, setDateYearValue] = useState(undefined)
  const [TotalKmsValue, setTotalKmsValue] = useState(undefined)
  const [PriceValue, setPriceValue] = useState(undefined)
  const [ImageUrl, setImageUrl] = useState(null)
  const [fileList, setFileList] = useState(null)

  const onFinish = (values) => {
    handleUploadCarModalOk()
    console.log('Success:', values);
  }
  const onFinishFailed = (errorInfo) => {
    message.error('fill the form correctly')
    console.log('Failed:', errorInfo)
  }
  
  const showUploadCarModal = () => {
    setUploadCarModal(true)
    form.resetFields()
  }
  const handleUploadCarModalCancel = () => {
    setUploadCarModal(false)
    form.resetFields()
    setFileList(null)
  }

  const MakeOnChangeFun=(e)=>setMakeValue(e.target.value)
  const ModelOnChangeFun=(e)=>setModelValue(e.target.value)
  const AvailableOnChangeFun=(e)=>setAvailableValue(e)
  const FuelTypeOnChangeFun=(e,o)=>setFuelTypeValue(o.label)
  const DateYearOnChangeFun=(e,d)=>{
    setDateYearValue(d)
    setForDatePicker(e)
  }
  const TotalKmsOnChangeFun=(e)=>setTotalKmsValue(e.target.value)
  const PriceOnChangeFun=(e)=>setPriceValue(e.target.value)

  const handleFileChange = ({ file, fileList: newFileList }) => {
    if (file.status === 'done') {
      message.success(`${file.name} file uploaded successfully`);
    } else if (file.status === 'error') {
      message.error(`${file.name} file upload failed.`);
    }
    setFileList(newFileList)
  }

  const customRequest = async ({ file, onSuccess, onError }) => {
    console.log(file)
    try {
      const response = await uploadFileToServer(file)
      console.log(response)
      // setImageUrl(response?.imageUrl)
      setImageUrl('https://www.team-bhp.com/forum/attachments/official-new-car-reviews/2218688d1634123125-volkswagen-polo-1-2l-gt-tsi-official-review-6-img_6085.jpg')
      if (response.success) {
        onSuccess()
      } else {
        onError()
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      onError()
    }
  }

  const uploadFileToServer = async (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, imageUrl: file })
      }, 1000)
    })
  }

  const handleUploadCarModalOk = async () => {
    await axios({
      method: 'POST',
      url: 'http://localhost:8888/cars/createCar',
      data: {
        PhotoUrl : ImageUrl,
        fuel : FuelTypeValue,
        make : MakeValue,
        mfg : DateYearValue,
        model : ModelValue,
        price : PriceValue,
        sold : AvailableValue,
        totalKms : TotalKmsValue,
      }
    }).then((res)=>{
        if(res?.data?.statusCode===500){
          message.error(res?.data?.msg)
        }else{
          message.success(res?.data?.msg)
        }
      api()
    }).catch((err)=>{
      console.log(err)
    })
    setUploadCarModal(false)
  }

  const api=async()=>{
    await axios.get('http://localhost:8888/cars/getAll').then((res)=>{
      setData(res?.data?.data)
      setInitialData(res?.data?.data)
    })
  }


  const priceCssFun=(e)=>{
    if(e.price > 1000000) return {color:'red'}
    else return {color:'green'}
  }
  const kmsCssFun=(e)=>{
    if(e.totalKms > 10000) return {color:'red'}
    else return {color:'green'}
  }
  const yearCssFun=(e)=>{
    if(e.mfg < 2017) return {color:'red'}
    else return {color:'green'}
  }

  const FilterFunc=(e)=>{
    setSelectValue(e)
    setSearchValue(undefined)
    switch (e) {
      case FilterOptions[0].value:{
        let newData=InitialData.sort((a,b)=>{
          return a.price-b.price
        })
        setData([...newData])
        break
    }case FilterOptions[1].value:{
      let newData=InitialData.sort((a,b)=>{
        return b.price-a.price
      })
      setData([...newData])
      break
    }case FilterOptions[2].value:{
      let newData=InitialData.filter((e)=>e.fuel==='petrol')
      setData([...newData])
      break
    }case FilterOptions[3].value:{
      let newData=InitialData.filter((e)=>e.fuel==='diesel')
      setData([...newData])
      break
    }case FilterOptions[4].value:{
      let newData=InitialData.sort((a,b)=>a.mfg-b.mfg)
      setData([...newData])
      break
    }case FilterOptions[5].value:{
      let newData=InitialData.sort((a,b)=>a.totalKms-b.totalKms)
      setData([...newData])
      break
    }default: setData(Data)
        break
    }
  }
  const SearchFunc=(e)=>{
    setSearchValue(e.target.value)
    setSelectValue(undefined)
    let newData=InitialData.filter((ele)=>ele.make.includes(e.target.value))
    setData(newData)
  }

  useEffect(()=>{
    api()    
  },[])

  return (
    <div>
      <main id='headerTabsMain'>
        <Select
          options={FilterOptions}
          style={{width:300}}
          onChange={FilterFunc}
          placeholder='filter here'
          value={SelectValue}
        />
        <Search
          style={{width:300}}
          onChange={SearchFunc}
          placeholder='search here'
          value={SearchValue}
        />
        <Button 
          style={{ background: 'green', color: 'white'}}
          onClick={showUploadCarModal}
        >
        Upload a car
        </Button>
      <Modal 
        title="Upload Car Details"
        open={UploadCarModal}
        // onOk={handleUploadCarModalOk}
        onCancel={handleUploadCarModalCancel}
        footer={false}
      >
        <Col>
          <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Item
              label="Make"
              name='MakeValue'
              rules={alphaRules}
            >
              <Input 
                placeholder='enter here'
                value={MakeValue}
                onChange={MakeOnChangeFun}
              />
            </Item>
            <Item
              label="Model"
              name='ModelValue'
              rules={alphaRules}
            >
              <Input 
                placeholder='enter here'
                value={ModelValue}
                onChange={ModelOnChangeFun}
              />
            </Item>
            <Item
              label="Availability"
              name='AvailableValue'
              rules={reqRules}
            >
              <Select 
                placeholder='select here'
                options={AvailabilityOptions}
                value={AvailableValue}
                onChange={AvailableOnChangeFun}
              />
            </Item>
            <Item
              label="Fuel Type"
              name='FuelTypeValue'
              rules={reqRules}
            >
              <Select 
                placeholder='select here'
                options={FuelTypesOptions}
                value={FuelTypeValue}
                onChange={FuelTypeOnChangeFun}
              />
            </Item>
            <Item
              label="Manufactured Year"
              name='ForDatePicker'
              rules={reqRules}
            >
              <DatePicker 
                picker="year"
                format='YYYY'
                disabledDate={e=>e && e.year() > new Date().getFullYear()}
                value={ForDatePicker}
                onChange={DateYearOnChangeFun}
              />
            </Item>
            <Item
              label="Total kms"
              name='TotalKmsValue'
              rules={numRules}
            >
              <Input 
                placeholder='enter here'
                value={TotalKmsValue}
                onChange={TotalKmsOnChangeFun}
              />
            </Item>
            <Item
              label="Best Price"
              name='PriceValue'
              rules={numRules}
            >
              <Input 
                placeholder='enter here'
                value={PriceValue}
                onChange={PriceOnChangeFun}
              />
            </Item>
            <Item
              label="Upload Car Image"
              rules={reqRules}
              name='fileList'
            >
              <Upload 
                {...ImageProps}
                fileList={fileList}
                customRequest={customRequest}
                onChange={handleFileChange}
              >
                <Button icon={<UploadOutlined/>}>Upload</Button>
              </Upload>
            </Item>
            <Row className='formFooterRow'>
              <Space>
                <Item>
                  <Button
                    type='primary'
                    htmlType="submit"
                  >
                    Save Details
                  </Button>
                </Item>
              </Space>
            </Row>
          </Form>
        </Col>
      </Modal>
      </main>

      <div className='MainMapDiv'>
      {
        Data?.length===0 ? 
        <div className='noDataFoundDiv'>
          <img 
            src="https://t4.ftcdn.net/jpg/04/75/01/23/360_F_475012363_aNqXx8CrsoTfJP5KCf1rERd6G50K0hXw.jpg" 
            alt="no data"
          />
        </div> 
        : Data.map((e,i)=>{
          return(
            <div key={i}>
              <Card
                // hoverable
                style={{ width: 240, boxShadow: '1px 1px 2px grey' }}
                cover={
                  <img 
                    id='imageDisplay'
                    alt={e.make} 
                    src={e?.PhotoUrl}
                  />
                }
              >
                <Meta title={e.make} description={e.model} />
                <main className='cardDetails'>
                  <p>Availability : 
                    {e.sold ? 
                    <span style={{color:'red'}}> Sold</span> : 
                    <span style={{color:'green'}}> For Sale</span>
                    }
                  </p>
                  <p>Fuel Type : {e.fuel}</p>
                  <p>Manufactured Year : 
                    <span style={yearCssFun(e)}> {e.mfg}</span>
                  </p>
                  <p>Total kms : 
                    <span style={kmsCssFun(e)}> {e.totalKms}</span>
                  </p>
                  <p>Best Price : 
                    <span style={priceCssFun(e)}> {e.price}/-</span>
                  </p>
                </main>
              </Card>
            </div>
          )
        })
      }
      </div>
    </div>

  )
}

export default App
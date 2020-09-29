import React, { Component } from "react";
import { Form, Icon, Input, Button, Radio, Select, List } from "antd";
import Axios from "axios";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

class App extends Component {
  state = {
    data: "",
  };

  componentDidMount() {
    this.props.form.validateFields();
    this.executeQuery({ url: "", method: "get" });
  }

  executeQuery = async (config) => {
    let result = config && config.url &&
    await Axios.request({
      ...config,
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: { Authorization: process.env.REACT_APP_AUTHORIZATION },
    });

    result = await Axios.get(process.env.REACT_APP_BASE_URL, {
      headers: { Authorization: process.env.REACT_APP_AUTHORIZATION }
    })
    this.setState({ ...this.state, data: result.data });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (!err) {
      this.executeQuery({ url: "/", method: "post", data });
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    const usernameError = isFieldTouched("name") && getFieldError("name");
    const descriptionError =
      isFieldTouched("description") && getFieldError("description");
    const isActiveError =
      isFieldTouched("isActive") && getFieldError("isActive");
    const typeError = isFieldTouched("type") && getFieldError("type");
    const addressError = isFieldTouched("address") && getFieldError("address");

    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };

    const typeOptions = ["Electricity", "Furniture", "Computers"];
    return (
      <div className="App">
        <h1>Antd 3 Facilities Form </h1>
        <Form layout="vertical" onSubmit={this.handleSubmit} style={{maxWidth: "500px", margin: "0 auto"}}>
          <Form.Item
            label="Name: "
            validateStatus={usernameError ? "error" : ""}
            help={usernameError || ""}
          >
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "Please input new facility name!" },
              ],
            })(<Input placeholder="Facility name" />)}
          </Form.Item>
          <Form.Item
            label="Description: "
            validateStatus={descriptionError ? "error" : ""}
            help={descriptionError || ""}
          >
            {getFieldDecorator("description", {
              initialValue: this.state.data.description || "" ,
              rules: [
                {
                  required: true,
                  message: "Please input new facility description!",
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type="info" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Facility description"
              />
            )}
          </Form.Item>
          <Form.Item
            label="Type: "
            validateStatus={typeError ? "error" : ""}
            help={typeError || ""}
          >
            {getFieldDecorator("type", {
              rules: [
                {
                  required: true,
                  message: "Please select facility type!",
                },
              ],
            })(
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Facility type"
                options={typeOptions}
              >
                {typeOptions.map((province) => (
                  <Select.Option key={province}>{province}</Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="isActive: "
            validateStatus={isActiveError ? "error" : ""}
            help={isActiveError || ""}
          >
            {getFieldDecorator("isActive", {
              rules: [
                {
                  required: true,
                  message: "Please select an active status!",
                },
              ],
            })(
              <Radio.Group buttonStyle="solid" style={{ textAlign: "left" }}>
                <Radio style={radioStyle} value={true}>
                  Active
                </Radio>
                <Radio style={radioStyle} value={false}>
                  Not Active
                </Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item
            label="Address: "
            validateStatus={addressError ? "error" : ""}
            help={addressError || ""}
          >
            {getFieldDecorator("address", {
              rules: [
                {
                  required: true,
                  message: "Please input new facility address!",
                },
              ],
            })(<Input placeholder="Facility address" />)}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Submit
            </Button>{" "}
            <Button
              type="ghost"
              htmlType="reset"
              onClick={() => this.props.form.resetFields()}
            >
              Reset
            </Button>
          </Form.Item>
        </Form>
        
        <br/>
        <br/>
        <h2>MY FACILITIES</h2>
        <List
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={this.state.data}
          footer={
            <div>
              <b>End of page</b>
            </div>
          }
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <Button onClick={() => {this.executeQuery({ url: "/" + item.id, method: "get" })}}>Update</Button>,
                <Button type="danger" onClick={() => {this.executeQuery({ url: "/" + item.id, method: "delete" })}}>
                  Delete
                </Button>,
              ]}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                title={<a href={item.id}>{item.id} | {item.name}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
        <br/>
        <br/>
      </div>
    );
  }
}

export default Form.create({ name: "myForm" })(App);

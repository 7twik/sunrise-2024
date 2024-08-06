import React, { useState } from 'react';
import { Card, Button, Divider, Form, Input } from 'antd';
import Task from '../model/Task';
import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface TaskCardProps {
  task: Task;
  id: number;
  title: string;
  description: string;
  persona: string;
  group: number;
  completed: boolean;
  boolValue: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, id, title, description, persona, group, completed, boolValue }) => {
  const [startUpdate, setStartUpdate] = useState<boolean>(false);
  const [form] = Form.useForm();

  const updateClick = () => {
    setStartUpdate(true);
    form.setFieldsValue({ title, description, persona, group });
  };

  const handleApiRequest = async (url: string, method: string, body?: object) => {
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.success) {
        alert(`Task ${method.toLowerCase()}d successfully`);
        if (method !== 'PUT') window.location.reload();
        return true;
      } else {
        alert(`Task ${method.toLowerCase()} failed`);
        return false;
      }
    } catch (error) {
      console.error(`Error during ${method} request:`, error);
      alert('An error occurred');
      return false;
    }
  };

  const submit = async () => {
    const values = form.getFieldsValue();
    values.id = id;
    if (!values.title || !values.description || !values.persona) {
      alert("All fields are necessary");
    } else {
      const success = await handleApiRequest("/api/tasks/update", "PUT", values);
      if (success) {
        setStartUpdate(false);
        window.location.reload();
      }
    }
  };

  const deleteTask = () => handleApiRequest(`/api/tasks/delete?id=${id}`, "DELETE");
  const completeTask = () => handleApiRequest("/api/tasks/complete", "POST", { title });

  const renderForm = () => (
    <Form
      name="validateOnly"
      layout="horizontal"
      form={form}
      initialValues={{ layout: "vertical" }}
    >
      {['title', 'description', 'persona'].map(field => (
        <Form.Item 
          key={field}
          name={field} 
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          rules={[{ required: true }]} 
          required 
          tooltip="This is a required field"
        >
          <Input placeholder={`Enter ${field}`} />
        </Form.Item>
      ))}
      <Form.Item>
        <Button type="primary" onClick={submit}>Submit</Button>
        <Button htmlType="reset" onClick={() => setStartUpdate(false)}>Cancel</Button>
      </Form.Item>
    </Form>
  );

  const renderContent = () => (
    <div style={{ textAlign: "center" }}>
      <h3 className="text-center font-semibold text-lg">{title}</h3>
      <Divider />
      {description}
    </div>
  );

  return (
    <Card
      title={`Task ${id}`}
      size="small"
      bordered={false}
      extra={
        <>
          <Button icon={<CheckOutlined />} onClick={completeTask} className="my-3 h-7 w-22" disabled={!boolValue} />
          <Button icon={<DeleteOutlined />} onClick={deleteTask} className="mt-3 h-7 w-22" />
          <Button icon={<EditOutlined />} onClick={updateClick} className="mt-3 h-7 w-22" />
        </>
      }
      className="bg-orange-300 w-[45vw] lg:w-[15vw]"
    >
      {startUpdate ? renderForm() : renderContent()}
    </Card>
  );
};

export default TaskCard;
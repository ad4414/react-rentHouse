import { Button, Form, Input } from "antd-mobile";
import React, { useEffect, useRef, useState } from "react";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "./Store";

const Login = () => {
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    // 设置 Canvas 大小
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // 创建粒子对象
    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3,
        color: "white",
        speedX: Math.random() - 1, // X 轴速度
        speedY: Math.random() - 1, // Y 轴速度
      };
    };

    // 更新粒子位置
    const updateParticles = () => {
      particles = particles.map((particle) => ({
        ...particle,
        x: particle.x + particle.speedX,
        y: particle.y + particle.speedY,
      }));
    };

    // 渲染粒子
    const renderParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 1.5);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
    };

    // 添加新粒子
    const addNewParticle = () => {
      particles.push(createParticle());
    };

    // 动画循环
    const animate = () => {
      updateParticles();
      renderParticles();
      addNewParticle();
      animationFrameId = requestAnimationFrame(animate);
    };

    // 初始化粒子
    for (let i = 0; i < 100; i++) {
      particles.push(createParticle());
    }

    // 设置 Canvas 大小
    resizeCanvas();

    // 开始动画
    animate();

    // 在窗口大小变化时重新设置 Canvas 大小
    window.addEventListener("resize", resizeCanvas);

    // 在组件卸载时清除动画和事件监听器
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  //验证登录

  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log(values);
    if (values.password === undefined && values.username === undefined) {
      alert("请输入正确的账号和密码");
    } else {
      navigate("/");
    }
  };
  return (
    <div className="canvas">
      <canvas
        ref={canvasRef}
        style={{
          backgroundColor: "black",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <h1
        style={{
          fontFamily: "Pacifico",
          fontSize: "48px",
          color: "white",
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      >
        好客租房
      </h1>
      <Form
        layout="horizontal"
        style={{ position: "absolute" }}
        onFinish={onFinish}
        validateTrigger={["onBlur"]}
      >
        <Form.Item label="用户名" name="username">
          <Input placeholder="请输入用户名" clearable />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          extra={
            <div className="eye">
              {!visible ? (
                <EyeInvisibleOutline onClick={() => setVisible(true)} />
              ) : (
                <EyeOutline onClick={() => setVisible(false)} />
              )}
            </div>
          }
        >
          <Input
            placeholder="请输入密码"
            clearable
            type={visible ? "text" : "password"}
          />
        </Form.Item>
        <Form.Item>
          <Button color="primary" type="submit" size="large" block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;

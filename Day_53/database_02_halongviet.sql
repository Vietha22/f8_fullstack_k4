-- Tạo bảng products để quản lý sản phẩm
CREATE TABLE products (
  product_id integer NOT NULL GENERATED ALWAYS AS IDENTITY, 
  product_name character varying(100) NOT NULL, 
  product_price NUMERIC(10, 2) NOT NULL CHECK (product_price >= 0), 
  product_stock integer NOT NULL CHECK (product_stock >= 0), 
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(), 
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() 
);

-- Tạo bảng customers để quản lý khách hàng
CREATE TABLE customers (
  customer_id integer NOT NULL GENERATED ALWAYS AS IDENTITY, 
  customer_name character varying(50) NOT NULL,
  customer_email character varying(100) NOT NULL, 
  customer_phone character varying(15) NOT NULL,  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(), 
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() 
);

-- Tạo bảng orders để quản lý đơn hàng
CREATE TABLE orders (
  order_id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
  order_date DATE NOT NULL, 
  customer_id integer NOT NULL
  product_id integer NOT NULL
  order_quantity integer NOT NULL CHECK (order_quantity > 0), 
  order_status boolean NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(), 
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(), 
  FOREIGN KEY (customer_id) REFERENCES customers (customer_id), 
  FOREIGN KEY (product_id) REFERENCES products (product_id) 
);

-- Thêm dữ liệu vào bảng products
INSERT INTO products (product_name, product_price, product_stock)
VALUES
('iPhone', 25000000, 100),
('Samsung', 20000000, 80),
('MacBook', 50000000, 50),
('Dell', 40000000, 40),
('AirPods', 6000000, 200),
('Sony', 7000000, 150);

-- Thêm dữ liệu vào bảng customers
INSERT INTO customers (customer_name, customer_email, customer_phone)
VALUES
('Nguyễn Văn A', 'nguyenvana@gmail.com', '0987654321'),
('Trần Thị B', 'tranb@yahoo.com', '0123456789'),
('Lê Văn C', 'levanc@hotmail.com', '0912345678'),
('Phạm Thị D', 'phamd@gmail.com', '0909123456'),
('Hoàng Văn E', 'hoange@yahoo.com', '0934567890'),
('Phạm Thị F', 'dof@hotmail.com', '0945678901');

-- Thêm dữ liệu vào bảng orders
INSERT INTO orders (order_date, customer_id, product_id, order_quantity)
VALUES
('2024-01-01', 1, 1, 2),
('2024-01-02', 2, 2, 1),
('2024-01-03', 3, 3, 1),
('2024-01-04', 4, 4, 2),
('2024-01-05', 5, 5, 3),
('2024-01-06', 6, 6, 4);

-- Xem danh sách đơn hàng
SELECT
  c.customer_name, 
  c.customer_email, 
  c.customer_phone, 
  SUM(o.order_quantity) AS total_quantity, 
  SUM(o.order_quantity * p.product_price) AS total_amount, 
  o.order_status, 
  o.order_date 
FROM orders o 
JOIN customers c ON o.customer_id = c.customer_id 
JOIN products p ON o.product_id = p.product_id 
GROUP BY c.customer_id, o.order_id 
ORDER BY o.order_date; 

-- Xem chi tiết đơn hàng
SELECT
  c.customer_name,
  c.customer_email, 
  c.customer_phone, 
  p.product_name, 
  p.product_id, 
  p.product_price, 
  o.order_quantity, 
  o.order_quantity * p.product_price AS product_amount, 
  o.order_status, 
  o.created_at, 
  o.updated_at 
FROM orders o 
JOIN customers c ON o.customer_id = c.customer_id 
JOIN products p ON o.product_id = p.product_id 
ORDER BY o.order_id; 

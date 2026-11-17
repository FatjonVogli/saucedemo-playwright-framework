SELECT
    c.CustomerName,
    c.Country,
    COUNT(DISTINCT o.OrderID) AS UnitedPackageOrders,
    ROUND(SUM(od.Quantity * p.Price), 2) AS TotalValue
FROM Customers c
JOIN Orders o ON o.CustomerID = c.CustomerID
JOIN Shippers s ON s.ShipperID = o.ShipperID
JOIN OrderDetails od ON od.OrderID = o.OrderID
JOIN Products p ON p.ProductID = od.ProductID
WHERE s.ShipperName = 'United Package'
GROUP BY c.CustomerID, c.CustomerName, c.Country
ORDER BY TotalValue DESC;

SELECT
    c.CustomerName,
    c.Country
FROM Customers c
WHERE EXISTS (
        SELECT 1
        FROM Orders o
        WHERE o.CustomerID = c.CustomerID
    )
  AND NOT EXISTS (
        SELECT 1
        FROM Orders o
        JOIN Shippers s ON s.ShipperID = o.ShipperID
        WHERE o.CustomerID = c.CustomerID
          AND s.ShipperName = 'United Package'
    )
ORDER BY c.CustomerName;

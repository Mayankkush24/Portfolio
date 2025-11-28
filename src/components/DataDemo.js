import React, { useEffect, useRef, useState } from 'react';
import './DataDemo.css';

function DataDemo() {
    const barChartRef = useRef(null);
    const lineChartRef = useRef(null);
    const pieChartRef = useRef(null);
    const [barTooltip, setBarTooltip] = useState({ visible: false, x: 0, y: 0, text: '' });
    const [pieTooltip, setPieTooltip] = useState({ visible: false, x: 0, y: 0, text: '' });
    const [selectedPieSlice, setSelectedPieSlice] = useState(null);

    // Bar Chart Data (Professional Palette)
    const barData = [
        { label: 'Users', value: 85, color: '#3182ce' }, // Professional Blue
        { label: 'Sessions', value: 92, color: '#38b2ac' }, // Teal
        { label: 'Engagement', value: 78, color: '#805ad5' }, // Muted Purple
        { label: 'Conversion', value: 65, color: '#718096' } // Slate Gray
    ];

    // Pie Chart Data
    const pieData = [
        { label: 'Python', value: 35, color: '#3182ce' },
        { label: 'SQL', value: 30, color: '#38b2ac' },
        { label: 'Power BI', value: 20, color: '#805ad5' },
        { label: 'Tableau', value: 15, color: '#718096' }
    ];

    // ==================== BAR CHART ====================
    useEffect(() => {
        const canvas = barChartRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const padding = 40;
        const chartWidth = rect.width - padding * 2;
        const chartHeight = rect.height - padding * 2;
        const barWidth = chartWidth / barData.length - 20;
        const maxValue = Math.max(...barData.map(d => d.value));

        // Clear canvas
        ctx.clearRect(0, 0, rect.width, rect.height);

        // Draw bars with animation
        barData.forEach((data, index) => {
            const x = padding + index * (chartWidth / barData.length) + 10;
            const barHeight = (data.value / maxValue) * chartHeight;
            const y = rect.height - padding - barHeight;

            // Draw bar
            const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
            gradient.addColorStop(0, data.color);
            gradient.addColorStop(1, data.color + '80');

            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, barWidth, barHeight);

            // Draw value on top
            ctx.fillStyle = '#f0f2f5';
            ctx.font = '14px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(data.value + '%', x + barWidth / 2, y - 5);

            // Draw label
            ctx.fillStyle = '#a0aec0';
            ctx.fillText(data.label, x + barWidth / 2, rect.height - padding + 20);
        });

        // Mouse move handler for tooltip
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            let found = false;
            barData.forEach((data, index) => {
                const barX = padding + index * (chartWidth / barData.length) + 10;
                const barHeight = (data.value / maxValue) * chartHeight;
                const barY = rect.height - padding - barHeight;

                if (x >= barX && x <= barX + barWidth && y >= barY && y <= barY + barHeight) {
                    setBarTooltip({
                        visible: true,
                        x: e.clientX,
                        y: e.clientY,
                        text: `${data.label}: ${data.value}%`
                    });
                    found = true;
                }
            });

            if (!found) {
                setBarTooltip({ ...barTooltip, visible: false });
            }
        };

        const handleMouseLeave = () => {
            setBarTooltip({ ...barTooltip, visible: false });
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // ==================== LINE CHART (Real-time) ====================
    useEffect(() => {
        const canvas = lineChartRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const padding = 40;
        const chartWidth = rect.width - padding * 2;
        const chartHeight = rect.height - padding * 2;

        let dataPoints = Array(50).fill(0).map(() => Math.random() * 80 + 20);
        let animationFrame;

        const drawChart = () => {
            ctx.clearRect(0, 0, rect.width, rect.height);

            // Draw grid lines
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 1;
            for (let i = 0; i <= 4; i++) {
                const y = padding + (chartHeight / 4) * i;
                ctx.beginPath();
                ctx.moveTo(padding, y);
                ctx.lineTo(rect.width - padding, y);
                ctx.stroke();
            }

            // Draw line
            const gradient = ctx.createLinearGradient(0, padding, 0, rect.height - padding);
            gradient.addColorStop(0, '#3182ce'); // Blue
            gradient.addColorStop(1, '#38b2ac'); // Teal

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 3;
            ctx.beginPath();

            dataPoints.forEach((value, index) => {
                const x = padding + (index / (dataPoints.length - 1)) * chartWidth;
                const y = rect.height - padding - (value / 100) * chartHeight;

                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });

            ctx.stroke();

            // Draw points
            dataPoints.forEach((value, index) => {
                const x = padding + (index / (dataPoints.length - 1)) * chartWidth;
                const y = rect.height - padding - (value / 100) * chartHeight;

                ctx.fillStyle = '#3182ce';
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fill();
            });

            // Simulate real-time data
            dataPoints.shift();
            dataPoints.push(Math.random() * 80 + 20);

            animationFrame = requestAnimationFrame(drawChart);
        };

        drawChart();

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, []);

    // ==================== PIE CHART ====================
    useEffect(() => {
        const canvas = pieChartRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const radius = Math.min(rect.width, rect.height) / 2 - 40;

        const total = pieData.reduce((sum, d) => sum + d.value, 0);
        let currentAngle = -Math.PI / 2;

        const drawPie = () => {
            ctx.clearRect(0, 0, rect.width, rect.height);

            pieData.forEach((data, index) => {
                const sliceAngle = (data.value / total) * Math.PI * 2;
                const endAngle = currentAngle + sliceAngle;

                // Draw slice
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, currentAngle, endAngle);
                ctx.closePath();

                // Highlight selected slice
                if (selectedPieSlice === index) {
                    const midAngle = currentAngle + sliceAngle / 2;
                    const offsetX = Math.cos(midAngle) * 10;
                    const offsetY = Math.sin(midAngle) * 10;
                    ctx.save();
                    ctx.translate(offsetX, offsetY);
                }

                ctx.fillStyle = data.color;
                ctx.fill();
                ctx.strokeStyle = '#0f1221';
                ctx.lineWidth = 2;
                ctx.stroke();

                if (selectedPieSlice === index) {
                    ctx.restore();
                }

                // Draw percentage
                const midAngle = currentAngle + sliceAngle / 2;
                const textX = centerX + Math.cos(midAngle) * (radius * 0.7);
                const textY = centerY + Math.sin(midAngle) * (radius * 0.7);

                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 14px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(data.value + '%', textX, textY);

                currentAngle = endAngle;
            });
        };

        drawPie();

        // Mouse click handler
        const handleClick = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const dx = x - centerX;
            const dy = y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= radius) {
                let angle = Math.atan2(dy, dx);
                if (angle < -Math.PI / 2) angle += 2 * Math.PI;
                angle += Math.PI / 2;

                let currentAngle = 0;
                for (let i = 0; i < pieData.length; i++) {
                    const sliceAngle = (pieData[i].value / total) * Math.PI * 2;
                    if (angle >= currentAngle && angle <= currentAngle + sliceAngle) {
                        setSelectedPieSlice(selectedPieSlice === i ? null : i);
                        break;
                    }
                    currentAngle += sliceAngle;
                }
            }
        };

        // Mouse move handler for tooltip
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const dx = x - centerX;
            const dy = y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= radius) {
                let angle = Math.atan2(dy, dx);
                if (angle < -Math.PI / 2) angle += 2 * Math.PI;
                angle += Math.PI / 2;

                let currentAngle = 0;
                for (let i = 0; i < pieData.length; i++) {
                    const sliceAngle = (pieData[i].value / total) * Math.PI * 2;
                    if (angle >= currentAngle && angle <= currentAngle + sliceAngle) {
                        setPieTooltip({
                            visible: true,
                            x: e.clientX,
                            y: e.clientY,
                            text: `${pieData[i].label}: ${pieData[i].value}%`
                        });
                        return;
                    }
                    currentAngle += sliceAngle;
                }
            }

            setPieTooltip({ ...pieTooltip, visible: false });
        };

        canvas.addEventListener('click', handleClick);
        canvas.addEventListener('mousemove', handleMouseMove);

        return () => {
            canvas.removeEventListener('click', handleClick);
            canvas.removeEventListener('mousemove', handleMouseMove);
        };
    }, [selectedPieSlice]);

    return (
        <section id="data-demo" style={{ minHeight: 'auto' }}>
            <div className="container">
                <div className="section-title">
                    <h2>Live Data Visualizations</h2>
                </div>

                <div className="demo-grid">
                    {/* Bar Chart */}
                    <div className="chart-container glass-card">
                        <h3>📊 Analytics Metrics</h3>
                        <canvas ref={barChartRef} className="chart-canvas"></canvas>
                        {barTooltip.visible && (
                            <div
                                className="chart-tooltip visible"
                                style={{ left: barTooltip.x + 10, top: barTooltip.y - 30 }}
                            >
                                {barTooltip.text}
                            </div>
                        )}
                    </div>

                    {/* Line Chart */}
                    <div className="chart-container glass-card">
                        <h3>📈 Real-Time Data Stream<span className="streaming-indicator"></span></h3>
                        <canvas ref={lineChartRef} className="chart-canvas"></canvas>
                    </div>

                    {/* Pie Chart */}
                    <div className="chart-container glass-card">
                        <h3>🥧 Data Distribution</h3>
                        <canvas ref={pieChartRef} className="chart-canvas"></canvas>
                        <div className="chart-legend">
                            {pieData.map((data, index) => (
                                <div key={index} className="legend-item">
                                    <div className="legend-color" style={{ backgroundColor: data.color }}></div>
                                    <span>{data.label}</span>
                                </div>
                            ))}
                        </div>
                        {pieTooltip.visible && (
                            <div
                                className="chart-tooltip visible"
                                style={{ left: pieTooltip.x + 10, top: pieTooltip.y - 30 }}
                            >
                                {pieTooltip.text}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DataDemo;

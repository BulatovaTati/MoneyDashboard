import {
    AreaChart,
    Area,
    Tooltip,
    ResponsiveContainer,
    LabelList,
  } from 'recharts';
  import s from './Currency.module.css';
  
  const CurrencyChart = ({ data }) => {
    const renderLabelWithIcon = props => {
      const { x, y, value, index } = props;
      let icon = null;
  
      if (data[index].name === 'USD') {
        icon = '$';
      } else if (data[index].name === 'EURO') {
        icon = '€';
      }
  
      return (
        <text x={x} y={y - 10} fill="#ff6f61" fontSize={14} textAnchor="middle">
          {icon ? `${icon} ${value}` : value}
        </text>
      );
    };
  
    const renderDot = props => {
      const { cx, cy, index } = props;
      const currencyName = data[index].name;
  
      if (currencyName === 'USD' || currencyName === 'EURO') {
        return (
          <circle
            key={`dot-${index}`}
            cx={cx}
            cy={cy}
            r={4}
            fill="#563EAF"
            stroke="#ff6f61"
            strokeWidth={2}
          />
        );
      }
      return null;
    };
  
    const renderActiveDot = props => {
      const { cx, cy, index } = props;
      const currencyName = data[index].name;
  
      if (currencyName === 'USD' || currencyName === 'EURO') {
        return (
          <circle
            cx={cx}
            cy={cy}
            r={5}
            fill="#ff6f61"
            stroke="#fff"
            strokeWidth={2}
          />
        );
      }
      return null;
    };
  
    const CustomTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
        return null;
      }
      return null;
    };
  
    return (
      <div className={s.graph}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} className="custom-chart">
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="currency"
              stroke="none"
              fill="url(#colorGradient)"
              fillOpacity={1}
              transform="translate(0, 10)"
              activeDot={false}
              dot={false}
            />
  
            <Area
              type="monotone"
              dataKey="currency"
              stroke="#ff6f61"
              strokeWidth={2}
              fill="none"
              activeDot={renderActiveDot}
              dot={renderDot}
            >
              <LabelList
                dataKey="label"
                content={renderLabelWithIcon}
                position="top"
                offset={10}
                fill="#ff6f61"
                fontSize={12}
              />
            </Area>
  
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: 'none' }}
              allowEscapeViewBox={{ x: true, y: true }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default CurrencyChart;



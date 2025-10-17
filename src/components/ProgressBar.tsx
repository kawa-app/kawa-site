import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
  label?: string;
  showValue?: boolean;
  animated?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  className = '',
  variant = 'primary',
  size = 'medium',
  label,
  showValue = false,
  animated = false
}) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);
  const progressClasses = `progress-bar progress-bar-${variant} progress-bar-${size} ${animated ? 'progress-bar-animated' : ''} ${className}`;

  return (
    <div className="progress-container">
      {(label || showValue) && (
        <div className="progress-header">
          {label && <span className="progress-label">{label}</span>}
          {showValue && <span className="progress-value">{Math.round(clampedValue)}%</span>}
        </div>
      )}
      <div className={progressClasses}>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${clampedValue}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

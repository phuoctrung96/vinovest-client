import React from "react";

export default ({ selected }) => (
    <svg width={16} height={10} viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M14.5098 0.00794184C14.3203 0.0323907 14.1454 0.112617 14.0127 0.235908L5.09213 8.20271L1.39762 5.56315C1.21947 5.43586 0.991992 5.37698 0.76524 5.39949C0.538487 5.42199 0.33103 5.52402 0.188507 5.68313C0.0459837 5.84224 -0.0199304 6.04538 0.00526439 6.24789C0.0304591 6.4504 0.144699 6.63569 0.322853 6.76297L4.62192 9.83447C4.78738 9.95129 4.99513 10.0097 5.20568 9.99868C5.41622 9.98762 5.61488 9.90783 5.76386 9.77451L15.2218 1.32775C15.3552 1.2159 15.4451 1.06899 15.4785 0.908372C15.512 0.747753 15.4872 0.581809 15.4078 0.434629C15.3284 0.28745 15.1985 0.166718 15.037 0.0899845C14.8755 0.0132514 14.6908 -0.0154928 14.5098 0.00794184Z"
            fill={selected ? "#FAE8D1" : "#FFFFFF"}
        />
    </svg>
);

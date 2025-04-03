"use client";

import React from "react";
import Link from "next/link";
import Wrapper from "../components/layouts/Wrapper";

export default function Page() {
  return (
    <Wrapper>
      <h1>Välkommen!</h1>
      <ul>
        <li>
          <Link href="/student-signup">Student Signup</Link>
        </li>
        <li>
          <Link href="/company-signup">Company Signup</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/student-dashboard">Student Dashboard</Link>
        </li>
        <li>
          <Link href="/company-dashboard">Company Dashboard</Link>
        </li>
      </ul>
    </Wrapper>
  );
}

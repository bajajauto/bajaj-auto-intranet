/*
 * The policy document library, keyed by the benefits bucket it belongs to.
 *
 * The shape mirrors `public/policies/<bucket>/` exactly — category folder →
 * topic folder → files — so the modal can be read against the folder tree and
 * the two kept in step. A category whose folder holds files directly, with no
 * topic folders under it, carries them on `documents` instead of `topics`.
 *
 * `href` is the path under public/ as it sits on disk, original names and all.
 * The component encodes it; nothing here is pre-escaped.
 *
 * The "… Description.docx" file in each folder is prose about the policy rather
 * than the policy itself, so its content is lifted into `summary` / `covered`
 * (and `contacts`, where it names someone to write to) and it is not listed as a
 * downloadable document — the page you are reading is that file. Folders with no
 * Description.docx have their summary drawn from the policy document itself. Documents with substance of their own (the DTP FAQs and its
 * frequently-missed points) are both rendered as `readables` and offered as
 * files, since the originals are what circulate over email.
 */

const LTWF = '/policies/Leave, Travel & Work Flexibility'

const LEAVE_TRAVEL_FLEXIBILITY = [
  {
    id: 'leave-attendance-work-flexibility',
    name: 'Leave, Attendance & Work Flexibility',
    icon: 'CalendarCheck',
    topics: [
      {
        id: 'leave',
        name: 'Leave',
        icon: 'CalendarDays',
        summary:
          'The Leave Policy enables employees to take time away from work for personal needs, illness, emergencies, rest and well-being while ensuring business continuity. The policy defines the various leave categories available, their eligibility criteria, approval process, carry-forward provisions and encashment rules, helping employees effectively plan and manage their time off.',
        covered: [
          'Earned Leave',
          'Casual/Sick Leave',
          'Exigency Leave',
          'Leave Carry Forward & Encashment',
          'Compensatory Offs',
          'Leave Approval Process',
        ],
        documents: [
          {
            name: 'Leave Policy for EX and above',
            type: 'pdf',
            size: 325115,
            href: `${LTWF}/Leave, Attendance & Work Flexibility/Leave/Leave Policy for EX and above.pdf`,
          },
          {
            name: 'Revised Leave Policy for Level 4',
            type: 'pdf',
            size: 223496,
            href: `${LTWF}/Leave, Attendance & Work Flexibility/Leave/Revised Leave Policy for Level 4.pdf`,
          },
          {
            name: 'Revised Leave Policy for Level 5',
            type: 'pdf',
            size: 281226,
            href: `${LTWF}/Leave, Attendance & Work Flexibility/Leave/Revised Leave Policy for Level 5.pdf`,
          },
          {
            name: 'Revised Leave Policy for Specialist Cadre',
            type: 'pdf',
            size: 218644,
            href: `${LTWF}/Leave, Attendance & Work Flexibility/Leave/Revised Leave Policy for Specialist Cadre.pdf`,
          },
          {
            name: 'Retrospective Attendance Regularisation Guidelines',
            type: 'pdf',
            size: 166598,
            href: `${LTWF}/Leave, Attendance & Work Flexibility/Leave/Retrospective Attendance Regularisation Guidelines.pdf`,
          },
          {
            name: 'Leave Policy FAQs',
            type: 'pdf',
            size: 407592,
            href: `${LTWF}/Leave, Attendance & Work Flexibility/Leave/Leave Policy FAQs.pdf`,
          },
        ],
      },
      {
        id: 'attendance-wfh',
        name: 'Attendance and WFH',
        icon: 'Laptop',
        summary:
          'The Attendance & Work From Home Policy provides eligible employees with flexibility in managing their work location and time while maintaining accountability for performance and deliverables. The policy outlines attendance requirements, work-from-home eligibility, approval mechanisms and expectations for a trust-based and results-oriented work culture.',
        covered: ['Work From Home (WFH)', 'Flexible Working', 'Remote Work Eligibility'],
        documents: [
          {
            name: 'Attendance & WFH',
            type: 'pdf',
            size: 191682,
            href: `${LTWF}/Leave, Attendance & Work Flexibility/Attendance and WFH/Attendance & WFH.pdf`,
          },
        ],
      },
      {
        id: 'maternity-leave',
        name: 'Maternity Leave',
        icon: 'Baby',
        summary:
          'The Maternity Benefits Policy provides eligible female employees with paid maternity leave and related benefits in accordance with applicable laws. The policy supports employees during pregnancy, childbirth, adoption, surrogacy and related medical circumstances, while ensuring job protection and continuity of employment benefits.',
        covered: [
          'Maternity Leave',
          'Adoption & Surrogacy Leave',
          'Miscarriage Leave',
          'Tubectomy Leave',
          'Conditions for additional Medical Leave',
          'Leave Application',
        ],
        documents: [
          {
            name: 'Maternity Benefits Policy',
            type: 'pdf',
            size: 194772,
            href: `${LTWF}/Leave, Attendance & Work Flexibility/Maternity Leave/Maternity Benefits Policy.pdf`,
          },
        ],
      },
      {
        id: 'paternity-leave',
        name: 'Paternity Leave',
        icon: 'Baby',
        summary:
          'The Paternity Leave Policy supports eligible male employees in their transition to parenthood by providing paid leave for childbirth, surrogacy, or adoption. The policy enables employees to spend time with their family during this important life event while ensuring continuity of employment benefits.',
        covered: [
          'Paternity Leave',
          'Adoption Leave',
          'Surrogacy-related Leave',
          'Leave Eligibility & Duration',
          'Leave Approval Process',
        ],
        documents: [
          {
            name: 'Paternity Leave Policy',
            type: 'pdf',
            size: 194881,
            href: `${LTWF}/Leave, Attendance & Work Flexibility/Paternity Leave/Paternity Leave Policy.pdf`,
          },
          {
            name: 'SOP to avail Paternity Leave',
            type: 'pdf',
            size: 293048,
            href: `${LTWF}/Leave, Attendance & Work Flexibility/Paternity Leave/SOP to avail Paternity Leave.pdf`,
          },
        ],
      },
    ],
  },
  {
    id: 'mobility-and-transfers',
    name: 'Mobility and Transfers',
    icon: 'Map',
    topics: [
      {
        id: 'tap',
        name: 'TAP',
        subtitle: 'Transfer Assistance Policy',
        icon: 'Truck',
        summary:
          'The Transfer Assistance Policy provides employees with financial support and relocation assistance when they are transferred to a different work location within India. The policy covers travel, accommodation, household relocation, schooling support, and other transfer-related benefits to help employees and their families transition smoothly to the new location.',
        covered: [
          'Transfer Travel Assistance',
          'Transfer & Relocation Leave',
          'Temporary Accommodation',
          'Brokerage Reimbursement',
          'Housing Deposit Support',
          'Household Goods Relocation',
          'Vehicle Relocation & Re-registration',
          'Schooling Assistance',
        ],
        documents: [
          {
            name: 'Transfer Assistance Policy 22.09.2020',
            type: 'pdf',
            size: 366886,
            href: `${LTWF}/Mobility and Transfers/TAP/Transfer Assistance Policy 22.09.2020.pdf`,
          },
        ],
      },
      {
        id: 'expat-separation',
        name: 'Expat Separation',
        icon: 'Globe',
        summary:
          'The Expat Separation Policy outlines the recovery of relocation, travel, settlement and deputation-related expenses in cases where an employee resigns during an overseas assignment or within one year of returning to India from an overseas deputation. The policy defines the financial obligations and settlement provisions applicable upon separation from employment.',
        covered: [],
        documents: [
          {
            name: 'Expat Separation Policy',
            type: 'pdf',
            size: 329514,
            href: `${LTWF}/Mobility and Transfers/Expat Separation/Expat Separation Policy.pdf`,
          },
        ],
      },
    ],
  },
  {
    id: 'travel-benefits',
    name: 'Travel Benefits',
    icon: 'Plane',
    topics: [
      {
        id: 'dtp',
        name: 'DTP',
        subtitle: 'Domestic Travel Policy',
        icon: 'Plane',
        summary:
          'The Domestic Travel Policy (DTP) provides guidelines, eligibility criteria, and reimbursement norms for employees undertaking official travel within India including regular business travel, transfer-related travel, and eligible travel requirements for new joiners. The policy ensures that official travel is planned, booked, and reimbursed in a safe, compliant and cost-effective manner.',
        covered: [
          'Travel',
          'Lodging',
          'Daily Allowance (DA)',
          'Expense Reimbursement',
          'Travel Advance',
          'Own Vehicle Usage',
        ],
        documents: [
          {
            name: 'Domestic travel Policy',
            type: 'pdf',
            size: 504960,
            href: `${LTWF}/Travel Benefits/DTP/Domestic travel Policy.pdf`,
          },
          {
            name: 'FAQs - DTP',
            type: 'docx',
            size: 31807,
            href: `${LTWF}/Travel Benefits/DTP/FAQs- DTP.docx`,
          },
          {
            name: 'Frequently Missed Points',
            type: 'docx',
            size: 29584,
            href: `${LTWF}/Travel Benefits/DTP/Frequently Missed Points.docx`,
          },
        ],
        readables: [
          {
            id: 'dtp-faqs',
            title: 'FAQs',
            icon: 'HelpCircle',
            kind: 'qa',
            entries: [
              {
                q: 'What kind of car can I avail for Inter-city and Local travel?',
                a: [
                  'CX / MX / LX: Innova or equivalent.',
                  'EX — Inter-city Travel: shared cab (hatchback or equivalent). Local Travel: hatchback / sedan or equivalent.',
                  'L4 / SP / L5 / Daily Rated Employees — Inter-city Travel: not eligible for cab travel. Local Travel: hatchback or equivalent.',
                  'Group Travel: if two or more employees are travelling together, a higher-category vehicle may be booked provided the overall cost is equal to or lower than the combined eligible travel cost.',
                ],
              },
              {
                q: 'Can an EX employee share a cab with an L4/SP/L5/Daily Rated employee?',
                a: [
                  'Yes. An EX employee can share a cab with L4/SP/L5/Daily Rated employees for inter-city travel when travelling together for official work.',
                ],
              },
              {
                q: 'Can I travel by taxi to the airport from my command area and claim reimbursement?',
                a: [
                  'Yes. If the airport is within 50 km of your command area, you may use a metered taxi, Ola, Uber, or public taxi.',
                  'If the distance exceeds 50 km, it will be treated as inter-city travel and eligibility will be as per the Domestic Travel Policy.',
                ],
              },
              {
                q: 'Can employees book cabs through MakeMyTrip (MMT)?',
                a: [
                  'Yes. Employees can book inter-city and local cabs through MMT as per their eligibility.',
                  'If booking is not available through MMT, employees may arrange cabs independently or through approved local vendors and claim reimbursement as per policy.',
                ],
              },
              {
                q: 'Can I book a bus ticket myself instead of through MMT?',
                a: [
                  'Yes. Employees may book bus tickets independently. A valid travel ticket or proof of travel must be submitted while claiming reimbursement.',
                ],
              },
              {
                q: 'Can I use Tatkal or Premium Tatkal train bookings?',
                a: [
                  'Yes, in urgent situations.',
                  'Since Tatkal and Premium Tatkal fares can be significantly higher, employees should obtain approvals in line with the flight fare approval matrix. Travel should ideally be planned in advance to avoid last-minute bookings.',
                ],
              },
              {
                q: 'Can I claim fuel reimbursement if I travel more than 300 km in a day using my own car?',
                a: [
                  'Yes. The 300 km per day limit is indicative. Fuel reimbursement can still be claimed as per policy.',
                  'However, employees are advised to avoid long-distance road journeys in a single day for safety reasons.',
                ],
              },
              {
                q: 'How is local travel reimbursement calculated when travelling from home?',
                a: [
                  'Only the additional distance travelled for official work over and above the normal home-to-office commute is eligible for reimbursement.',
                ],
              },
              {
                q: 'Can I use my own car for inter-city travel?',
                a: [
                  'Yes, but it should generally be avoided for single-person inter-city travel unless it is operationally convenient, such as roles requiring significant local travel at the destination.',
                ],
              },
              {
                q: 'How is travel duration calculated?',
                a: [
                  'Start time: departure from residence in the city of posting.',
                  'End time: arrival back at residence in the city of posting.',
                ],
              },
              {
                q: 'What is considered a one-way flight fare?',
                a: [
                  'One-way fare means the total fare from the source city to the destination city, including connecting flights where a direct flight is not available.',
                  'Example: Pune → Delhi = ₹3,500 and Delhi → Pantnagar = ₹2,500, so the one-way airfare = ₹6,000.',
                ],
              },
              {
                q: 'Does the one-way flight fare include taxes for approval purposes?',
                a: ['Yes. The airfare considered for approval includes all applicable taxes.'],
              },
              {
                q: 'Am I eligible for Daily Allowance (DA) if all travel, lodging and food expenses are borne by Bajaj Auto?',
                a: [
                  'No. In such cases, DA is not payable. Employees may claim only incidental expenses, where applicable.',
                ],
              },
              {
                q: 'How should GST be handled for Union Territories?',
                a: [
                  'Union Territories (except Chandigarh) generally do not have separate GST registrations. In such cases, employees may use the GSTIN and address of their reporting/base location as specified in the policy.',
                ],
              },
              {
                q: 'How do I claim reimbursement for shared expenses?',
                a: [
                  'While submitting the claim in MMT Expense, select the Share Expense option.',
                  'Choose the employees with whom the expense was shared. The selected employees will receive a notification regarding the shared expense.',
                ],
              },
              {
                q: 'Can I claim flight or hotel cancellation charges?',
                a: [
                  'Yes. Cancellation charges may be submitted through MyClaims (MMT) along with the reason for cancellation and will be routed to the appropriate approver for review.',
                ],
              },
            ],
          },
          {
            id: 'dtp-frequently-missed',
            title: 'Frequently Missed Points',
            icon: 'AlertTriangle',
            kind: 'points',
            entries: [
              {
                q: 'Submit Claims Within Timelines',
                a: [
                  'Travel expense claims must be submitted within 90 days from the date of expense.',
                  'Claims submitted after the prescribed timeline may not be approved.',
                ],
              },
              {
                q: 'Book Through MMT Wherever Possible',
                a: [
                  'Employees are encouraged to use the MakeMyTrip (MMT) platform for travel bookings and expense submissions.',
                  'Offline bookings may require additional approvals and justification.',
                ],
              },
              {
                q: 'Flight Fare Approvals Matter',
                a: [
                  'Higher flight fares require additional approvals.',
                  'Always check the applicable approval matrix before booking expensive flight tickets to avoid reimbursement delays.',
                ],
              },
              {
                q: 'Obtain GST-Compliant Hotel Invoices',
                a: [
                  'Hotel invoices should be raised in the name of Bajaj Auto Ltd. – A/c Employee Name.',
                  'Ensure the correct GSTIN and office address are mentioned on the bill.',
                ],
              },
              {
                q: 'Keep All Supporting Documents',
                a: [
                  'Boarding passes, travel tickets, hotel invoices, cab receipts, and other supporting bills should be retained until reimbursement is processed.',
                ],
              },
              {
                q: 'Daily Allowance (DA) Is Not Applicable in All Cases',
                a: [
                  'DA cannot be claimed when lodging, food, and travel expenses are fully borne by the company.',
                  'In such situations, only eligible incidental expenses may be claimed.',
                ],
              },
              {
                q: 'Use Correct Expense Heads While Claiming',
                a: [
                  'Claims should be submitted under the appropriate category in MMT MyClaims.',
                  'Incorrect categorization may result in claim rejection or rework.',
                ],
              },
              {
                q: 'Women Employee Travel Provision',
                a: [
                  'Women employees are eligible for individual cab bookings for travel undertaken after 7:00 PM or before 5:30 AM under specified circumstances.',
                ],
              },
              {
                q: 'Guesthouse Availability Should Be Checked First',
                a: [
                  'For locations such as Pune and Waluj, employees should first check the availability of company guesthouse accommodation before booking hotels.',
                ],
              },
              {
                q: 'Cancellation Charges Are Not Automatic',
                a: [
                  'Flight or hotel cancellation charges must be claimed separately through MyClaims with a valid reason and are subject to approval.',
                ],
              },
              {
                q: 'Personal Vehicle Claims Have Conditions',
                a: [
                  'Employees using their own vehicle for official work should inform their manager and follow the prescribed reimbursement guidelines.',
                  'Long-distance road travel should be planned keeping safety considerations in mind.',
                ],
              },
              {
                q: 'Shared Expenses Must Be Tagged Correctly',
                a: [
                  'If food or other expenses are shared with colleagues, use the "Share Expense" option in MMT while submitting the claim.',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'ftp',
        name: 'FTP',
        subtitle: 'Foreign Travel Policy',
        icon: 'Globe',
        summary:
          'The Foreign Travel Policy provides guidelines for employees undertaking official international travel. It outlines travel related provisions to ensure safe, compliant, and cost-effective overseas business travel.',
        covered: [
          'Travel Class Eligibility',
          'Lodging Allowance',
          'Travel Allowance (TA)',
          'Mobile Allowance',
        ],
        documents: [
          {
            name: 'Foreign Travel Policy (Revised)',
            type: 'pdf',
            size: 345221,
            href: `${LTWF}/Travel Benefits/FTP/Foreign_Travel_Policy_Revised.pdf`,
          },
        ],
      },
    ],
  },
  {
    // No topic folders on disk — the files sit straight in the category.
    id: 'travel-claims-mmt',
    name: 'Travel Claims (MMT)',
    icon: 'Receipt',
    summary:
      'The MMT MyBiz Travel & Expense Management platform enables employees to book official travel, manage itineraries, submit travel and non-travel expense claims and track approvals and reimbursements. It serves as a single platform for travel booking, expense reporting, claim processing, and approval workflows.',
    covered: ['Travel Bookings', 'Expense Claims', 'Travel Reimbursements'],
    documents: [
      {
        name: 'Process Flow for MyBiz',
        type: 'pdf',
        size: 3566182,
        href: `${LTWF}/Travel Claims (MMT)/Process Flow for MyBiz.pdf`,
      },
      {
        name: 'Process Flow MyClaims',
        type: 'pdf',
        size: 3657345,
        href: `${LTWF}/Travel Claims (MMT)/Process Flow MyClaims.pdf`,
      },
      {
        name: 'User Guide for Approvals',
        type: 'pdf',
        size: 4151344,
        href: `${LTWF}/Travel Claims (MMT)/User Guide for Approvals.pdf`,
      },
      {
        name: 'FAQs MyBiz and MyClaims',
        type: 'pdf',
        size: 169438,
        href: `${LTWF}/Travel Claims (MMT)/FAQs MyBiz and MyClaims.pdf`,
      },
      {
        name: 'Bajaj Auto Signup',
        type: 'pdf',
        size: 416577,
        href: `${LTWF}/Travel Claims (MMT)/BajajAuto Signup.pdf`,
      },
    ],
  },
]

const PAY = '/policies/Pay, Compensation & Finance'

const PAY_COMPENSATION_FINANCE = [
  {
    id: 'savings-retirement',
    name: 'Savings & Retirement',
    icon: 'PiggyBank',
    topics: [
      {
        id: 'provident-fund',
        name: 'Provident Fund',
        icon: 'PiggyBank',
        summary:
          'The Provident Fund (PF) helps employees build long-term savings for retirement through regular contributions accumulated over the course of employment. In addition to retirement savings, the scheme provides eligible members access to refundable advances and non-refundable withdrawals for specific personal, educational, medical, housing, and family-related needs, subject to applicable rules and eligibility criteria.',
        covered: [
          'Provident Fund savings and retirement accumulation',
          'Refundable PF advances for eligible personal and family needs',
          'Non-refundable PF withdrawals for housing, education and life events',
        ],
        contacts: [
          {
            purpose: 'PF queries — Bajaj Auto Limited (BAL) employees',
            email: 'balpf@bajajauto.co.in',
          },
          {
            purpose:
              'BACL, BATL, BAF and other group entities — follow the applicable EPFO process and guidelines',
          },
        ],
        documents: [
          {
            name: 'PF Rules',
            type: 'pdf',
            size: 39760,
            href: `${PAY}/Savings & Retirement/Provident Fund/PF Rules.pdf`,
          },
          {
            name: 'PF Refundable Advance Rules',
            type: 'pdf',
            size: 44013,
            href: `${PAY}/Savings & Retirement/Provident Fund/PF Refundable Advance Rules.pdf`,
          },
          {
            name: 'PF Non Refundable Advance Rules',
            type: 'pdf',
            size: 44896,
            href: `${PAY}/Savings & Retirement/Provident Fund/PF Non Refundable Advance Rules.pdf`,
          },
        ],
      },
      {
        id: 'superannuation-rules',
        name: 'Superannuation Rules',
        subtitle: 'BAESS',
        icon: 'Landmark',
        summary:
          'The Bajaj Auto Employees’ Superannuation Scheme (BAESS) helps eligible employees build a retirement corpus through employer-funded contributions. Upon retirement, members can receive a portion of the accumulated amount as a lump sum and use the remaining balance to purchase an annuity that provides a regular pension income for life, subject to the scheme rules. The Superannuation Scheme is a legacy retirement benefit for existing members.',
        covered: [],
        contacts: [
          {
            purpose: 'Moving from Superannuation to the Corporate NPS scheme',
            email: 'khkulkarni1@bajajauto.co.in',
          },
        ],
        documents: [
          {
            name: 'Superannuation Rules',
            type: 'pdf',
            size: 91802,
            href: `${PAY}/Savings & Retirement/Superannuation Rules/Superannuation Rules.pdf`,
          },
        ],
      },
      {
        id: 'corporate-nps',
        name: 'Corporate NPS',
        subtitle: 'National Pension System',
        icon: 'TrendingUp',
        summary:
          'The Corporate National Pension System (NPS) enables eligible employees to build a retirement corpus through employer-facilitated contributions to an NPS account. The scheme helps employees save for the future while availing applicable tax benefits and provides an option to receive a regular pension income after retirement through annuity investments.',
        covered: [
          'Employer-facilitated NPS contributions',
          'PRAN (Permanent Retirement Account Number) registration and management',
          'Corporate NPS enrolment and account portability',
        ],
        documents: [
          {
            name: 'NPS',
            type: 'pdf',
            size: 667978,
            href: `${PAY}/Savings & Retirement/Corporate NPS/NPS.pdf`,
          },
        ],
      },
      {
        id: 'pension-rules',
        name: 'Pension Rules',
        subtitle: 'Employees’ Pension Scheme (EPS)',
        icon: 'UserCheck',
        summary:
          'The Employees’ Pension Scheme (EPS) provides eligible employees with a regular monthly pension after retirement, subject to applicable service and age requirements. The scheme also offers financial protection to dependants through widow, child, nominee and disability pension benefits, helping provide long-term income security for employees and their families.',
        covered: [
          'Retirement pension under the Employees’ Pension Scheme (EPS)',
          'Pension claim and withdrawal procedures',
        ],
        documents: [
          {
            name: 'Pension Rules',
            type: 'pdf',
            size: 155742,
            href: `${PAY}/Savings & Retirement/Pension Rules/Pension Rules.pdf`,
          },
        ],
      },
    ],
  },
  {
    id: 'equity-wealth-creation',
    name: 'Equity & Wealth Creation',
    icon: 'TrendingUp',
    topics: [
      {
        id: 'esop-financing',
        name: 'ESOP Financing',
        icon: 'HandCoins',
        summary:
          'ESOP Financing sets out the indicative funding options available through external financiers for employees exercising vested ESOPs. Exercising requires the exercise price to be paid upfront, which can be a significant amount; financing meets that requirement through a loan, typically secured against the shares allotted on exercise. The summary of terms compares interest rates, maximum funding, processing fees, brokerage and tenure across the listed providers, and each provider brochure carries the full detail. Any financing arrangement is solely between the employee and the financier.',
        covered: [
          'Funding for the upfront ESOP exercise price',
          'Interest rates by tenure',
          'Maximum funding (loan-to-value)',
          'Processing fees & brokerage',
          'Provider comparison & SPOCs',
        ],
        documents: [
          {
            name: 'Summary of Terms',
            type: 'pdf',
            size: 156162,
            href: `${PAY}/Equity & Wealth Creation/ESOP Financing/Summary of Terms.pdf`,
          },
          {
            name: 'Nuvama',
            type: 'pdf',
            size: 907271,
            href: `${PAY}/Equity & Wealth Creation/ESOP Financing/Nuvama.pdf`,
          },
          {
            name: 'Bajaj Broking',
            type: 'pdf',
            size: 331245,
            href: `${PAY}/Equity & Wealth Creation/ESOP Financing/Bajaj Broking.pdf`,
          },
          {
            name: 'Infina',
            type: 'pdf',
            size: 735445,
            href: `${PAY}/Equity & Wealth Creation/ESOP Financing/Infina.pdf`,
          },
        ],
      },
    ],
  },
  {
    id: 'compensation-rewards',
    name: 'Compensation & Rewards',
    icon: 'Banknote',
    topics: [
      {
        id: 'performance-reward-payout-on-separation',
        name: 'Performance Reward Payout in Case of Separation',
        icon: 'Award',
        summary:
          'The policy on annual payments in case of separation governs eligibility for annual increments and performance reward payouts when an employee leaves. Where the resignation date and/or the last working date falls before the release of an annual increment or performance reward payout, the employee is not eligible for that increment, the performance reward, or any arrears on account of the same. The policy applies to all employees of Bajaj Auto Limited, including all its subsidiaries globally.',
        covered: [
          'Annual increment on separation',
          'Performance reward eligibility',
          'Arrears on annual payments',
          'Applicability across group entities',
        ],
        documents: [
          {
            name: 'Performance Reward Payout (Revised)',
            type: 'pdf',
            size: 221366,
            href: `${PAY}/Compensation & Rewards/Performance Reward Payout in Case of Separation/Performance Reward Payout (Revised).pdf`,
          },
        ],
      },
    ],
  },
]

const HEALTH = '/policies/Health, Insurance & Safety'

const HEALTH_INSURANCE_SAFETY = [
  {
    id: 'medical-coverage',
    name: 'Medical coverage',
    icon: 'Stethoscope',
    topics: [
      {
        id: 'chbs',
        name: 'Corporate Hospitalization Benefit Scheme',
        subtitle: 'CHBS',
        icon: 'Stethoscope',
        summary:
          'The Corporate Hospitalization Benefit Scheme (CHBS) provides comprehensive medical insurance coverage for employees and their eligible dependents. In addition to the Company-provided base mediclaim policy, employees can choose to enhance their coverage through voluntary top-up mediclaim and parental mediclaim plans, ensuring greater financial protection against hospitalization and medical expenses. Enrolment and coverage details are managed through the EB360 portal during the enrolment window.',
        covered: [
          'Base Mediclaim Coverage for employees and eligible dependents',
          'Cashless and reimbursement hospitalization claims',
          'Voluntary Top-Up Mediclaim',
          'Voluntary Parental Mediclaim',
        ],
        contacts: [
          { purpose: 'Enrolment support', email: 'samadhan@allianceinsurance.in' },
          { purpose: 'Claim-related support', email: 'health.admin@bajajallianz.co.in' },
        ],
        documents: [
          {
            name: 'BAL - Mediclaim Handbook',
            type: 'pdf',
            size: 551945,
            href: `${HEALTH}/Medical coverage/Corporate Hospitalization Benefit Scheme/BAL - Mediclaim Handbook.pdf`,
          },
          {
            name: 'CHBS Enrolment SOP',
            type: 'pdf',
            size: 1957901,
            href: `${HEALTH}/Medical coverage/Corporate Hospitalization Benefit Scheme/CHBS Enrolment SOP.pdf`,
          },
          {
            name: 'Voluntary Top-up Insurance Scheme',
            type: 'pdf',
            size: 195546,
            href: `${HEALTH}/Medical coverage/Corporate Hospitalization Benefit Scheme/Voluntary Top-up Insurance Scheme.pdf`,
          },
          {
            name: 'Voluntary Parental Mediclaim Policy',
            type: 'pdf',
            size: 204361,
            href: `${HEALTH}/Medical coverage/Corporate Hospitalization Benefit Scheme/Voluntary Parental mediclaim Policy.pdf`,
          },
          {
            name: 'Day Care Procedures',
            type: 'pdf',
            size: 305859,
            href: `${HEALTH}/Medical coverage/Corporate Hospitalization Benefit Scheme/Day Care Procedures.pdf`,
          },
          {
            name: 'Non Admissible expenses',
            type: 'pdf',
            size: 65295,
            href: `${HEALTH}/Medical coverage/Corporate Hospitalization Benefit Scheme/Non Admissible expenses.pdf`,
          },
        ],
      },
    ],
  },
  {
    id: 'insurance',
    name: 'Insurance',
    icon: 'Umbrella',
    topics: [
      {
        id: 'group-personal-accident',
        name: 'Group Personal Accident',
        subtitle: 'GPA',
        icon: 'ShieldAlert',
        summary:
          'The Group Personal Accident (GPA) Insurance Plan provides financial protection to employees and their families in the event of an accident. The policy offers coverage for accidental death, permanent or temporary disability, accident-related medical expenses, and additional support benefits to help employees and their dependents manage the financial impact of unforeseen accidents.',
        covered: [
          'Accidental Death Benefit',
          'Permanent Total Disability Benefit',
          'Permanent Partial Disability Benefit',
          'Temporary Total Disability Benefit',
        ],
        documents: [
          {
            name: 'GPA Benefits Manual',
            type: 'pdf',
            size: 594407,
            href: `${HEALTH}/Insurance/Group Personal Accident/GPA_Benefits Manual.pdf`,
          },
        ],
      },
      {
        id: 'group-term-life',
        name: 'Group Term Life Policy',
        subtitle: 'GTL',
        icon: 'HeartPulse',
        summary:
          'The Group Term Life (GTL) Insurance Benefit provides financial protection to employees’ nominees in the unfortunate event of the employee’s death. The benefit offers life insurance coverage at no cost to employees, with the sum assured varying based on employee level, helping provide financial security to the employee’s family.',
        covered: [
          'Group Term Life Insurance coverage',
          'Financial protection for employee nominees',
        ],
        contacts: [
          {
            purpose: 'Group Term Life Insurance queries',
            email: 'employeewellness@bajajauto.co.in',
          },
        ],
        documents: [
          {
            name: 'Term Life Policy — SP, EX & Above',
            type: 'pdf',
            size: 214420,
            href: `${HEALTH}/Insurance/Group Term Life Policy/Term_Life_Policy_SP_EX&Above.pdf`,
          },
          {
            name: 'Term Life Benefit Policy — L4 & Below',
            type: 'pdf',
            size: 230045,
            href: `${HEALTH}/Insurance/Group Term Life Policy/Term Life Benefit Policy_L4&Below.pdf`,
          },
        ],
      },
    ],
  },
]

const VEHICLE = '/policies/Vehicle & Mobility'

const VEHICLE_MOBILITY = [
  {
    id: 'vehicle-asset-benefits',
    name: 'Vehicle & Asset Benefits',
    icon: 'Car',
    topics: [
      {
        id: 'company-car-lease',
        name: 'Company Car Lease Policy',
        icon: 'Car',
        summary:
          'The Company Car Benefit enables eligible employees to lease a vehicle through the Company’s designated leasing partner and manage associated fuel and maintenance expenses through the Pluxee platform. Employees can choose a vehicle and lease tenure based on their eligibility, while benefiting from a streamlined solution for vehicle ownership, fuel expenses, maintenance reimbursements and applicable tax advantages.',
        covered: [
          'Company-leased vehicle for eligible employees',
          'Flexible lease tenure options',
          'Fuel expenses through the Pluxee Fuel Wallet',
        ],
        documents: [
          {
            name: 'Car Lease Policy (Updated)',
            type: 'pdf',
            size: 348683,
            href: `${VEHICLE}/Vehicle & Asset Benefits/Company Car Lease Policy/Car Lease Policy Updated.pdf`,
          },
          {
            name: 'Fuel and Maintenance Policy (Pluxee)',
            type: 'pdf',
            size: 400730,
            href: `${VEHICLE}/Vehicle & Asset Benefits/Company Car Lease Policy/Fuel and Maintenance Policy (Pluxee).pdf`,
          },
          {
            name: 'FAQs — Pluxee Fuel & Maintenance',
            type: 'pdf',
            size: 341511,
            href: `${VEHICLE}/Vehicle & Asset Benefits/Company Car Lease Policy/FAQ_Pluxee_F&M.pdf`,
          },
        ],
      },
      {
        id: 'vehicle-policies',
        name: 'Vehicle Policies',
        subtitle: 'Bajaj Vehicle Ownership Benefit',
        icon: 'Bike',
        summary:
          'The Bajaj Vehicle Ownership Benefit enables eligible employees to purchase Bajaj two-wheelers at special employee prices through authorized dealerships. Employees can avail exclusive discounts on vehicle purchases and, when financed through BACL, benefit from preferential interest rates, zero processing fees and flexible loan tenure options.',
        covered: [
          'Employee discount on eligible Bajaj two-wheelers',
          'Vehicle purchase through authorized Bajaj dealerships',
          'Special employee loan interest rates through BACL',
        ],
        documents: [
          {
            name: 'Bajaj Vehicle Policy',
            type: 'pdf',
            size: 212009,
            href: `${VEHICLE}/Vehicle & Asset Benefits/Vehicle Policies/Bajaj Vehicle Policy.pdf`,
          },
          {
            name: 'Bajaj Vehicle Policy SOP',
            type: 'pdf',
            size: 1863315,
            href: `${VEHICLE}/Vehicle & Asset Benefits/Vehicle Policies/Bajaj Vehicle Policy SOP.pdf`,
          },
          {
            name: 'Bajaj Vehicle Policy — Calculator',
            type: 'xlsx',
            size: 168871,
            href: `${VEHICLE}/Vehicle & Asset Benefits/Vehicle Policies/Bajaj Vehicle Policy-Calculator.xlsx`,
          },
        ],
      },
    ],
  },
]

const CAREER = '/policies/Career Growth & Development'

// Both folders hold their files directly, with no topic folder in between.
const CAREER_GROWTH_DEVELOPMENT = [
  {
    id: 'leap',
    name: 'LEAP',
    subtitle: 'Learning & Education Assistance Policy',
    icon: 'GraduationCap',
    summary:
      'The Learning & Education Assistance Policy (LEAP) provides a framework for employees to apply for approved higher education and professional learning programs, including full-time, part-time, online, and weekend courses, subject to eligibility and management approval. It defines the application process, educational assistance, and applicable support for eligible employees.',
    covered: [
      'Higher Education & Professional Learning Programs',
      'Educational Assistance & Fee Sponsorship',
      'Sabbatical Leave for Approved Full-Time Courses',
    ],
    documents: [
      {
        name: 'Learning and Education Assistance Policy (LEAP)',
        type: 'pdf',
        size: 372593,
        href: `${CAREER}/LEAP/Learning and Education Assistance Policy (“LEAP”)”.pdf`,
      },
    ],
  },
  {
    id: 'internal-job-posting',
    name: 'Internal Job Posting',
    subtitle: 'IJP · REV Program',
    icon: 'UserPlus',
    summary:
      'The Internal Job Posting (IJP), also known as the REV Program, enables employees to explore and apply for internal career opportunities across business units through a fair and transparent process. The policy defines eligibility criteria, application procedures, and role transition guidelines, helping employees pursue career growth and development while supporting internal talent mobility within the organization.',
    covered: [
      'Internal Job Opportunities & Career Growth',
      'Eligibility & Application Process',
      'Selection, Transfer & Role Transition Guidelines',
    ],
    documents: [
      {
        name: 'Internal Job Posting',
        type: 'pdf',
        size: 1075165,
        href: `${CAREER}/Internal Job Posting/Internal Job Posting.pdf`,
      },
    ],
  },
]

const ESSENTIALS = '/policies/Workplace Essentials'

const WORKPLACE_ESSENTIALS = [
  {
    id: 'office-facilities',
    name: 'Office Facilities',
    icon: 'Utensils',
    topics: [
      {
        id: 'canteen-policy',
        name: 'Canteen Policy',
        subtitle: 'Canteen Meal Card Benefit',
        icon: 'Utensils',
        summary:
          'The Canteen Meal Card Benefit is available to all on-roll employees of Bajaj Auto Ltd and its subsidiaries. The benefit can be availed through a Pluxee card or by paying directly at the canteen — EX & above opt in through the meal card enrolment form, while L4 & below can have NFC tags linked to their identity cards. The policy covers card activation and KYC, the monthly loading amounts available, the adjustment against Miscellaneous Allowance, the lock-in that runs to the start of the next financial year, and what happens to the benefit on separation.',
        covered: [
          'Pluxee meal card enrolment',
          'Meal benefit loading amounts',
          'Card activation & KYC',
          'Opt-in / opt-out window',
          'Salary adjustment against Miscellaneous Allowance',
          'Benefit on separation',
        ],
        documents: [
          {
            name: 'Canteen Policy (Revised)',
            type: 'pdf',
            size: 329265,
            href: `${ESSENTIALS}/Office Facilities/Canteen Policy/Canteen Policy Revised.pdf`,
          },
        ],
      },
    ],
  },
  {
    id: 'work-resources',
    name: 'Work Resources',
    icon: 'Smartphone',
    topics: [
      {
        id: 'policy-on-mobile-phones',
        name: 'Policy on Mobile Phones',
        icon: 'Smartphone',
        summary:
          'Mobile phone services are provided by the Company as per role and business needs. The policy covers the SIM approval route by level, the level-wise monthly expense limits, ISD and international roaming on prior approval, and the guidelines for data services. The 2012 amendment simplifies recovery of excess bills: personal numbers need not be declared, no recovery is made where the monthly bill is within the prescribed limit, and employees exceeding the limit may seek L1 approval where the excess is due to official calls.',
        covered: [
          'SIM approval by level',
          'Level-wise monthly expense limits',
          'ISD & international roaming',
          'Data services guidelines',
          'Recovery of excess bills',
        ],
        documents: [
          {
            name: 'Policy on Mobile Phones',
            type: 'pdf',
            size: 147576,
            href: `${ESSENTIALS}/Work Resources/Policy on Mobile Phones/Policy on Mobile Phones.pdf`,
          },
        ],
      },
    ],
  },
]

const GOVERNANCE = '/policies/Workplace Governance & Compliance'

const WORKPLACE_GOVERNANCE_COMPLIANCE = [
  {
    id: 'workplace-conduct-and-ethics',
    name: 'Workplace Conduct and Ethics',
    icon: 'Scale',
    topics: [
      {
        id: 'code-of-conduct',
        name: 'Code of Conduct',
        icon: 'ScrollText',
        summary:
          'The Code of Conduct gives employees guidance on the day-to-day situations they meet in the course of their duties. It is not an attempt to detail every rule, nor does it replace the law of the land — it supports and clarifies accepted professional behaviour, and forms part of the service conditions of the employee. The Code is built on three elements: good working norms, cultural norms and integrity norms. For each, it states the purpose of the norm, what the norm is, and how violations are dealt with. The Ethics Helpline poster carries the channels for raising an integrity concern.',
        covered: [
          'Good working norms',
          'Cultural norms',
          'Integrity norms',
          'Dealing with violations',
          'Integrity Matters — Ethics Helpline',
        ],
        documents: [
          {
            name: 'Code Of Conduct',
            type: 'pdf',
            size: 462138,
            href: `${GOVERNANCE}/Workplace Conduct and Ethics/Code of Conduct/Code Of Conduct.pdf`,
          },
          {
            name: 'Integrity Matters — Ethics Helpline',
            type: 'png',
            size: 477712,
            href: `${GOVERNANCE}/Workplace Conduct and Ethics/Code of Conduct/Integrity Matters- Ethics Helpline.png`,
          },
        ],
      },
      {
        id: 'human-rights',
        name: 'Human Rights',
        icon: 'HeartHandshake',
        summary:
          'The Human Rights Policy reaffirms Bajaj Auto’s commitment to a culture where human rights are respected and upheld, and to eliminating unfair labour practices such as child labour, forced labour and discrimination of any kind. It applies to all plants, locations and regional offices, and sets out the guidelines on minimum age of employment, the prohibition of forced or bonded labour, a discrimination-free workplace, and the freedom of employees to approach officials beyond their immediate superior. Business partners are expected to establish a human rights compliant environment at their own workplaces.',
        covered: [
          'Prevention of child labour, forced labour and discrimination',
          'Awareness of violations and their consequences',
          'Applicability across all plants, locations and regional offices',
          'Grievance handling and escalation',
          'Implementation and monitoring',
        ],
        documents: [
          {
            name: 'Human Rights Policy',
            type: 'pdf',
            size: 111866,
            href: `${GOVERNANCE}/Workplace Conduct and Ethics/Human Rights/Human Rights Policy.pdf`,
          },
        ],
      },
      {
        id: 'standing-order',
        name: 'Standing Order',
        icon: 'ClipboardList',
        summary:
          'The Standing Orders are the certified conditions of employment for the Company’s industrial establishments under the Industrial Employment (Standing Orders) Act, 1946, together with the amendments certified by the Certifying Officer. They set out the terms that govern the employment relationship for the establishments they cover.',
        covered: [],
        documents: [
          {
            name: 'Standing Orders',
            type: 'pdf',
            size: 190988,
            href: `${GOVERNANCE}/Workplace Conduct and Ethics/Standing Order/Standing orders.pdf`,
          },
        ],
      },
    ],
  },
  {
    id: 'workplace-safety',
    name: 'Workplace Safety',
    icon: 'ShieldCheck',
    topics: [
      {
        id: 'posh',
        name: 'POSH',
        subtitle: 'Prevention of Sexual Harassment at Workplace',
        icon: 'ShieldCheck',
        summary:
          'The POSH Policy reiterates the Company’s intent to prevent sexual harassment at the workplace, in line with the Prevention, Prohibition and Redressal of Sexual Harassment of Women at Workplace Act, 2013. It applies to all employees — including trainees, apprentices and probationers — at all locations, and redressal can also be sought by visitors and employees of business partners who deal with Company employees. The policy defines what constitutes sexual harassment, spreads awareness of the consequences of violations, and lays down the mechanism for dealing with complaints.',
        covered: [
          'Objectives of the POSH policy',
          'Applicability and definition of workplace',
          'Definition of sexual harassment',
          'Complaint and redressal mechanism',
        ],
        documents: [
          {
            name: 'POSH Policy for BAL',
            type: 'pdf',
            size: 8797209,
            href: `${GOVERNANCE}/Workplace Safety/POSH/Posh Policy for BAL.pdf`,
          },
          {
            name: 'POSH Policy for CTL',
            type: 'pdf',
            size: 5040851,
            href: `${GOVERNANCE}/Workplace Safety/POSH/Posh Policy for CTL.pdf`,
          },
        ],
      },
    ],
  },
  {
    id: 'governance',
    name: 'Governance',
    icon: 'Shield',
    topics: [
      {
        id: 'whistleblower-policy',
        name: 'Whistleblower Policy',
        subtitle: 'Vigil Mechanism',
        icon: 'Megaphone',
        summary:
          'Many violations do not affect an individual directly but are detrimental to the organisation’s interest, and individuals hesitate to report them out of fear or indifference. The Whistle Blower Policy / Vigil Mechanism provides a way for a director, employee, trainee or contract worker to report such violations — unethical behaviour, suspected or actual fraud, breaches of the Code of Conduct, or violations of Occupational Safety, Health and Environment norms — without fear of victimisation. Complaints are addressed to the Enforcement Committee, which protects the complainant’s identity and recommends action to the Managing Director / Chairman within four weeks.',
        covered: [
          'Reporting violations without fear of victimisation',
          'Addressing complaints to the Enforcement Committee',
          'Protection of the complainant’s identity',
          'Protection from discrimination and retaliation',
          'Investigation, decision and escalation timelines',
          'Direct access to the Chairman of the Audit Committee',
        ],
        documents: [
          {
            name: 'Whistle Blower Policy',
            type: 'pdf',
            size: 82909,
            href: `${GOVERNANCE}/Governance/Whistleblower Policy/Whistle Blower Policy.pdf`,
          },
        ],
      },
    ],
  },
  {
    id: 'inclusion-and-employee-rights',
    name: 'Inclusion and Employee Rights',
    icon: 'Users',
    topics: [
      {
        id: 'equal-opportunity',
        name: 'Equal Opportunity Policy',
        icon: 'Accessibility',
        summary:
          'Bajaj Auto endeavours to provide all employees with a work environment that encourages openness, diversity and mutual trust, and which is free from any form of discrimination or harassment. Employment related decisions rest solely on an individual’s merit, skills, qualifications, job role and business requirements, with no discrimination on the basis of colour, race, gender, religion, region, nationality, caste, social or ethnic origin, sexual orientation, disability or family history. In line with the Rights of Persons with Disabilities Act, 2016, the Company provides adequate facilities, assistive devices and barrier-free accessibility where required. Violations can be reported to the grievance redressal officer and are treated as gross misconduct.',
        covered: [
          'Hiring',
          'Job postings',
          'Transfers',
          'Promotions & appraisals',
          'Terms & conditions of employment',
          'Training & development',
          'Grievance redressal and disciplinary action',
          'Provisions for persons with disabilities',
        ],
        documents: [
          {
            name: 'Equal Opportunity Policy',
            type: 'pdf',
            size: 536505,
            href: `${GOVERNANCE}/Inclusion and Employee Rights/Equal Opportunity Policy/Equal Opportunity Policy.pdf`,
          },
        ],
      },
      {
        id: 'hiv-and-aids',
        name: 'Policy on prevention of HIV and AIDS',
        icon: 'Ribbon',
        summary:
          'The Policy on HIV & AIDS (Prevention & Control) in the Workplace sets out Bajaj Auto’s commitment to non-discrimination, awareness and health support, and applies to all employees including trainees, apprentices and probationers at all locations. The Company will not discriminate against any employee or applicant affected by HIV & AIDS and treats it the same as any other illness across its policies and benefits. Employees are never compelled to disclose their status, screening is not part of pre-employment or annual health checks, and voluntary disclosures are held under the data protection measures required by the HIV & AIDS (Prevention and Control) Act, 2017.',
        covered: [
          'Safe, healthy and inclusive work environment',
          'Awareness, prevention, care and counselling',
          'Non-discrimination',
          'HIV testing, confidentiality and disclosure',
          'Complaint handling under the HIV & AIDS Act, 2017',
        ],
        documents: [
          {
            name: 'Policy on prevention of HIV and AIDS',
            type: 'pdf',
            size: 94515,
            href: `${GOVERNANCE}/Inclusion and Employee Rights/Policy on prevention of HIV and AIDS/Policy on prevention of HIV and AIDS.pdf`,
          },
        ],
      },
    ],
  },
  {
    id: 'employment-rules',
    name: 'Employment Rules',
    icon: 'FileSignature',
    topics: [
      {
        id: 'notice-period-policy',
        name: 'Notice Period Policy',
        icon: 'FileSignature',
        summary:
          'The policy on notice pay in case of resignation sets out the notice applicable on either side. During probation or any extension of it, services may be terminated without notice and without assigning a reason. After confirmation, either side may terminate with one month’s notice (L4 & below) or three months’ notice (EX & above), or salary in lieu — though acceptance of salary in lieu of notice is at the Company’s discretion. On resignation, management may at its sole discretion waive the notice period in full or in part, in which case neither side pays salary in lieu for the waived period.',
        covered: [
          'Notice during probation',
          'Notice period after confirmation',
          'Salary in lieu of notice',
          'Waiver of notice period',
        ],
        documents: [
          {
            name: 'Notice Period Policy',
            type: 'pdf',
            size: 207445,
            href: `${GOVERNANCE}/Employment Rules/Notice Period Policy/Notice Period Policy.pdf`,
          },
        ],
      },
    ],
  },
]

const MIS = '/policies/Management Information Systems (MIS)'

const MANAGEMENT_INFORMATION_SYSTEMS = [
  {
    // No topic folders on disk — the files sit straight in the category.
    id: 'mis-related-policies',
    name: 'MIS Related Policies',
    icon: 'Monitor',
    summary:
      'The MIS policy set governs how Bajaj Auto’s information systems are used and protected — company email, internet access, Office 365, passwords, antivirus, mass mailing, and the physical security of IT assets and premises. Each policy states the standard employees are expected to follow and the controls MIS applies to keep Company systems and data secure.',
    covered: [
      'Email management',
      'Internet usage',
      'Office 365 management',
      'Password management',
      'Antivirus management',
      'Mass mailing',
      'Physical security',
      'IT asset physical security',
    ],
    documents: [
      {
        name: 'MIS Email Management Policy',
        type: 'pdf',
        size: 659173,
        href: `${MIS}/MIS Related Policies/MIS Email Management Policy.pdf`,
      },
      {
        name: 'MIS Internet Policy',
        type: 'pdf',
        size: 710207,
        href: `${MIS}/MIS Related Policies/MIS Internet Policy.pdf`,
      },
      {
        name: 'MIS O365 Management Policy',
        type: 'pdf',
        size: 610317,
        href: `${MIS}/MIS Related Policies/MIS O365 Management Policy.pdf`,
      },
      {
        name: 'MIS Password Management',
        type: 'pdf',
        size: 639417,
        href: `${MIS}/MIS Related Policies/MIS Password Management.pdf`,
      },
      {
        name: 'MIS Antivirus Management Policy',
        type: 'pdf',
        size: 621323,
        href: `${MIS}/MIS Related Policies/MIS Antivirus Management Policy.pdf`,
      },
      {
        name: 'MIS Mass Mailing Policy',
        type: 'pdf',
        size: 2352372,
        href: `${MIS}/MIS Related Policies/MIS Mass Mailing Policy.pdf`,
      },
      {
        name: 'MIS Physical Security Policy',
        type: 'pdf',
        size: 558331,
        href: `${MIS}/MIS Related Policies/MIS Physical Security Policy.pdf`,
      },
      {
        name: 'MIS Assets Physical Security Policy',
        type: 'pdf',
        size: 558331,
        href: `${MIS}/MIS Related Policies/MIS Assets Physical Security Policy.pdf`,
      },
    ],
  },
  {
    id: 'mis-data-protection',
    name: 'MIS Data Protection',
    icon: 'Database',
    topics: [
      {
        id: 'privacy-policies',
        name: 'Privacy Policies',
        icon: 'Lock',
        summary:
          'The privacy policy set defines how personal data is classified, retained, transferred and protected across Bajaj Auto, and how the Privacy Office operates. Together the documents cover the internal privacy policy, consent management, cross-border data transfers, personal data classification, retention and disposal, data subject rights, breach notification, privacy change management, and the DPO’s org structure and responsibilities — alongside the working trackers and schedules the Privacy Office maintains.',
        covered: [
          'Internal privacy policy',
          'Consent management',
          'Cross border data transfer',
          'Personal data classification',
          'Data retention and disposal',
          'Data subject rights management',
          'Personal data breach notification',
          'Privacy change management',
          'DPO org structure, roles and responsibilities',
        ],
        documents: [
          {
            name: 'BAL Internal Privacy Policy',
            type: 'pdf',
            size: 1348635,
            href: `${MIS}/MIS Data Protection/Privacy Policies/BAL Internal Privacy Policy.pdf`,
          },
          {
            name: 'BAL Consent Management Policy',
            type: 'pdf',
            size: 1429786,
            href: `${MIS}/MIS Data Protection/Privacy Policies/BAL Consent Management Policy.pdf`,
          },
          {
            name: 'BAL Cross Border Data Transfer Policy',
            type: 'pdf',
            size: 1347706,
            href: `${MIS}/MIS Data Protection/Privacy Policies/BAL Cross Border Data Transfer Policy.pdf`,
          },
          {
            name: 'BAL Personal Data Classification Policy',
            type: 'pdf',
            size: 1351413,
            href: `${MIS}/MIS Data Protection/Privacy Policies/BAL Personal Data Classification Policy.pdf`,
          },
          {
            name: 'BAL Data Retention and Disposal Policy',
            type: 'pdf',
            size: 1427926,
            href: `${MIS}/MIS Data Protection/Privacy Policies/BAL Data Retention and Disposal Policy.pdf`,
          },
          {
            name: 'BAL Data Subject Rights Management Policy',
            type: 'pdf',
            size: 1445389,
            href: `${MIS}/MIS Data Protection/Privacy Policies/BAL Data Subject Rights Management Policy.pdf`,
          },
          {
            name: 'BAL Personal Data Breach Notification',
            type: 'pdf',
            size: 1530570,
            href: `${MIS}/MIS Data Protection/Privacy Policies/BAL Personal Data Breach Notification.pdf`,
          },
          {
            name: 'BAL Privacy Change Management Policy and Procedure',
            type: 'pdf',
            size: 1585805,
            href: `${MIS}/MIS Data Protection/Privacy Policies/BAL Privacy Change Management Policy and Procedure.pdf`,
          },
          {
            name: 'BAL DPO Org Structure and Roles and Responsibilities',
            type: 'pdf',
            size: 1481917,
            href: `${MIS}/MIS Data Protection/Privacy Policies/BAL DPO Org Structure and Roles and Responsibilities.pdf`,
          },
          {
            name: 'BAL SOP for Privacy Office Operations',
            type: 'pdf',
            size: 1313856,
            href: `${MIS}/MIS Data Protection/Privacy Policies/BAL SOP for Privacy Office Operations.pdf`,
          },
          {
            name: 'Data Retention Schedule v1',
            type: 'xlsx',
            size: 35464,
            href: `${MIS}/MIS Data Protection/Privacy Policies/Data Retention Schedule v1.xlsx`,
          },
          {
            name: 'Privacy Incident Tracker v1',
            type: 'xlsx',
            size: 17451,
            href: `${MIS}/MIS Data Protection/Privacy Policies/Privacy Incident Tracker v1.xlsx`,
          },
          {
            name: 'Country-Specific Regulatory Privacy Compliance v1',
            type: 'xlsx',
            size: 108550,
            href: `${MIS}/MIS Data Protection/Privacy Policies/Country-Specific Regulatory privacy Compliance v1 (1).xlsx`,
          },
        ],
      },
      {
        id: 'data-processing-agreement',
        name: 'Data Processing Agreement',
        subtitle: 'DPA',
        icon: 'FileSignature',
        summary:
          'The Data Processing Agreement (DPA) establishes the responsibilities, obligations, and safeguards for processing Personally Identifiable Information (PII) on behalf of Bajaj Auto. The agreement defines requirements related to data protection, privacy, security, data breach management, and compliance with applicable data protection laws to ensure secure and lawful handling of personal data.',
        covered: [
          'Processing and Protection of Personal Data (PII)',
          'Data Security, Access Controls & Compliance Requirements',
          'Data Breach Notification, Retention & Deletion Requirements',
        ],
        documents: [
          {
            name: 'Data Processing Agreement',
            type: 'pdf',
            size: 154429,
            href: `${MIS}/MIS Data Protection/Data Processing Agreement/Data Processing Agreement.pdf`,
          },
        ],
      },
    ],
  },
]

// Keyed by the bucket ids in src/config/benefits.config.js. A bucket missing
// from here has no folder under public/policies yet and falls back to its plain
// benefit list in the modal.
const LIBRARY = {
  'pay-compensation-finance': PAY_COMPENSATION_FINANCE,
  'health-insurance-safety': HEALTH_INSURANCE_SAFETY,
  'leave-travel-flexibility': LEAVE_TRAVEL_FLEXIBILITY,
  'vehicle-mobility': VEHICLE_MOBILITY,
  'workplace-essentials': WORKPLACE_ESSENTIALS,
  'workplace-governance-compliance': WORKPLACE_GOVERNANCE_COMPLIANCE,
  'career-growth-development': CAREER_GROWTH_DEVELOPMENT,
  'management-information-systems': MANAGEMENT_INFORMATION_SYSTEMS,
}

export const policyLibraryMock = {
  getByBucket(bucketId) {
    return LIBRARY[bucketId] ?? null
  },
}

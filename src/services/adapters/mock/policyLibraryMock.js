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
 * and it is not listed as a downloadable document — the page you are reading is
 * that file. Documents with substance of their own (the DTP FAQs and its
 * frequently-missed points) are both rendered as `readables` and offered as
 * files, since the originals are what circulate over email.
 */

const ROOT = '/policies/Leave, Travel & Work Flexibility'

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
            href: `${ROOT}/Leave, Attendance & Work Flexibility/Leave/Leave Policy for EX and above.pdf`,
          },
          {
            name: 'Revised Leave Policy for Level 4',
            type: 'pdf',
            size: 223496,
            href: `${ROOT}/Leave, Attendance & Work Flexibility/Leave/Revised Leave Policy for Level 4.pdf`,
          },
          {
            name: 'Revised Leave Policy for Level 5',
            type: 'pdf',
            size: 281226,
            href: `${ROOT}/Leave, Attendance & Work Flexibility/Leave/Revised Leave Policy for Level 5.pdf`,
          },
          {
            name: 'Revised Leave Policy for Specialist Cadre',
            type: 'pdf',
            size: 218644,
            href: `${ROOT}/Leave, Attendance & Work Flexibility/Leave/Revised Leave Policy for Specialist Cadre.pdf`,
          },
          {
            name: 'Leave Policy FAQs',
            type: 'pdf',
            size: 407592,
            href: `${ROOT}/Leave, Attendance & Work Flexibility/Leave/Leave Policy FAQs.pdf`,
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
            href: `${ROOT}/Leave, Attendance & Work Flexibility/Attendance and WFH/Attendance & WFH.pdf`,
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
            href: `${ROOT}/Leave, Attendance & Work Flexibility/Maternity Leave/Maternity Benefits Policy.pdf`,
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
            href: `${ROOT}/Leave, Attendance & Work Flexibility/Paternity Leave/Paternity Leave Policy.pdf`,
          },
          {
            name: 'SOP to avail Paternity Leave',
            type: 'pdf',
            size: 293048,
            href: `${ROOT}/Leave, Attendance & Work Flexibility/Paternity Leave/SOP to avail Paternity Leave.pdf`,
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
            href: `${ROOT}/Mobility and Transfers/TAP/Transfer Assistance Policy 22.09.2020.pdf`,
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
            href: `${ROOT}/Mobility and Transfers/Expat Separation/Expat Separation Policy.pdf`,
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
            href: `${ROOT}/Travel Benefits/DTP/Domestic travel Policy.pdf`,
          },
          {
            name: 'FAQs - DTP',
            type: 'docx',
            size: 31807,
            href: `${ROOT}/Travel Benefits/DTP/FAQs- DTP.docx`,
          },
          {
            name: 'Frequently Missed Points',
            type: 'docx',
            size: 29584,
            href: `${ROOT}/Travel Benefits/DTP/Frequently Missed Points.docx`,
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
            href: `${ROOT}/Travel Benefits/FTP/Foreign_Travel_Policy_Revised.pdf`,
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
        href: `${ROOT}/Travel Claims (MMT)/Process Flow for MyBiz.pdf`,
      },
      {
        name: 'Process Flow MyClaims',
        type: 'pdf',
        size: 3657345,
        href: `${ROOT}/Travel Claims (MMT)/Process Flow MyClaims.pdf`,
      },
      {
        name: 'User Guide for Approvals',
        type: 'pdf',
        size: 4151344,
        href: `${ROOT}/Travel Claims (MMT)/User Guide for Approvals.pdf`,
      },
      {
        name: 'FAQs MyBiz and MyClaims',
        type: 'pdf',
        size: 169438,
        href: `${ROOT}/Travel Claims (MMT)/FAQs MyBiz and MyClaims.pdf`,
      },
      {
        name: 'Bajaj Auto Signup',
        type: 'pdf',
        size: 416577,
        href: `${ROOT}/Travel Claims (MMT)/BajajAuto Signup.pdf`,
      },
    ],
  },
]

const LIBRARY = {
  'leave-travel-flexibility': LEAVE_TRAVEL_FLEXIBILITY,
}

export const policyLibraryMock = {
  getByBucket(bucketId) {
    return LIBRARY[bucketId] ?? null
  },
}

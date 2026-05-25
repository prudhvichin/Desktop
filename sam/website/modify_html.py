import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace Names
content = content.replace('Asher Communications', 'Asher Group')
content = content.replace('ASHER COMMUNICATIONS', 'ASHER GROUP')

# Replace emails
content = content.replace('peddada.csc@gmail.com', 'ashergroupsvizag@gmail.com')

# Replace Google Fonts
old_fonts = '<link\n        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"\n        rel="stylesheet">'
new_fonts = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">'
content = content.replace(old_fonts, new_fonts)

# Replace WhatsApp Button
old_wa = '<a href="https://wa.me/919490190464"'
new_wa = '<a href="https://wa.me/919133113338"'
content = content.replace(old_wa, new_wa)

# Remove Sam Joel contact person card
sam_joel_card = """                    <div class="info-block glass-card">
                        <div class="info-icon"><i class="fa-solid fa-user"></i></div>
                        <div class="info-text">
                            <h4>Contact Person</h4>
                            <p>Sam Joel</p>
                        </div>
                    </div>"""
content = content.replace(sam_joel_card, "")

# Remove other references to Sam Joel
content = content.replace('Contact Sam Joel at 94901 90464 for trusted documentation and support.', 'Contact us at 91331 13338 for trusted documentation and support.')
content = content.replace('<span class="float-tooltip">Call Sam Joel</span>', '<span class="float-tooltip">Call Us</span>')
content = content.replace('call Sam\n                    Joel directly.', 'call us directly.')

# Services Section Redesign
# The services tabs and panes:
services_start_marker = '<!-- Tabs Navigation -->'
services_end_marker = '<!-- Why Choose Us Section -->'

services_html = """<!-- Tabs Navigation -->
            <div class="services-tabs-container reveal-item">
                <button class="tab-btn active" data-tab="insurance">
                    <i class="fa-solid fa-shield-halved"></i> Insurance
                </button>
                <button class="tab-btn" data-tab="rto">
                    <i class="fa-solid fa-car-rear"></i> RTO Services
                </button>
                <button class="tab-btn" data-tab="banking">
                    <i class="fa-solid fa-building-columns"></i> Banking
                </button>
                <button class="tab-btn" data-tab="solar">
                    <i class="fa-solid fa-solar-panel"></i> Solar Panels
                </button>
                <button class="tab-btn" data-tab="online">
                    <i class="fa-solid fa-globe"></i> Online Services
                </button>
            </div>

            <!-- Tab Content Pane -->
            <div class="services-content-pane">

                <!-- Insurance Services -->
                <div class="tab-pane active" id="insurance">
                    <div class="services-grid">
                        <div class="service-card glass-card">
                            <div class="service-card-icon"><i class="fa-solid fa-heart-pulse"></i></div>
                            <h3>Life & Health</h3>
                            <p>Comprehensive protection for you and your family.</p>
                            <ul class="service-list">
                                <li><i class="fa-solid fa-circle-check"></i> Life Insurance</li>
                                <li><i class="fa-solid fa-circle-check"></i> Health Insurance</li>
                                <li><i class="fa-solid fa-circle-check"></i> Personal Accident Insurance</li>
                            </ul>
                        </div>
                        <div class="service-card glass-card">
                            <div class="service-card-icon"><i class="fa-solid fa-car-burst"></i></div>
                            <h3>Vehicle Insurance</h3>
                            <p>Full protection policies for all types of vehicles.</p>
                            <ul class="service-list">
                                <li><i class="fa-solid fa-circle-check"></i> 2 & 4 Wheeler Insurance</li>
                                <li><i class="fa-solid fa-circle-check"></i> Commercial Vehicle Insurance</li>
                            </ul>
                        </div>
                        <div class="service-card glass-card">
                            <div class="service-card-icon"><i class="fa-solid fa-umbrella"></i></div>
                            <h3>Term Plans</h3>
                            <p>Secure your family's future with reliable term plans.</p>
                            <ul class="service-list">
                                <li><i class="fa-solid fa-circle-check"></i> Term Life Insurance</li>
                                <li><i class="fa-solid fa-circle-check"></i> Return of Premium Plans</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- RTO Services -->
                <div class="tab-pane" id="rto">
                    <div class="services-grid">
                        <div class="service-card glass-card">
                            <div class="service-card-icon"><i class="fa-solid fa-id-card-clip"></i></div>
                            <h3>Licence Works</h3>
                            <p>Licence acquisition and verification processes simplified.</p>
                            <ul class="service-list">
                                <li><i class="fa-solid fa-circle-check"></i> DL / LLR Booking</li>
                                <li><i class="fa-solid fa-circle-check"></i> Licence Renewal</li>
                            </ul>
                        </div>
                        <div class="service-card glass-card">
                            <div class="service-card-icon"><i class="fa-solid fa-truck-ramp-box"></i></div>
                            <h3>Vehicle Services</h3>
                            <p>Seamless processing for all vehicle-related documentation.</p>
                            <ul class="service-list">
                                <li><i class="fa-solid fa-circle-check"></i> Vehicle Transfer</li>
                                <li><i class="fa-solid fa-circle-check"></i> NOC Procurement</li>
                                <li><i class="fa-solid fa-circle-check"></i> Fitness Certificate</li>
                            </ul>
                        </div>
                        <div class="service-card glass-card">
                            <div class="service-card-icon"><i class="fa-solid fa-coins"></i></div>
                            <h3>Taxation</h3>
                            <p>Hassle-free vehicle tax payments and clearances.</p>
                            <ul class="service-list">
                                <li><i class="fa-solid fa-circle-check"></i> Vehicle Tax Payments</li>
                                <li><i class="fa-solid fa-circle-check"></i> Penalty Clearances</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Banking Services -->
                <div class="tab-pane" id="banking">
                    <div class="services-grid">
                        <div class="service-card glass-card">
                            <div class="service-card-icon"><i class="fa-solid fa-hand-holding-dollar"></i></div>
                            <h3>Loan Assistance</h3>
                            <p>Get processed quickly with minimum document overhead.</p>
                            <ul class="service-list">
                                <li><i class="fa-solid fa-circle-check"></i> Personal Loans</li>
                                <li><i class="fa-solid fa-circle-check"></i> Business Loans</li>
                                <li><i class="fa-solid fa-circle-check"></i> Home Loans</li>
                            </ul>
                        </div>
                        <div class="service-card glass-card">
                            <div class="service-card-icon"><i class="fa-solid fa-car"></i></div>
                            <h3>Vehicle Loans</h3>
                            <p>Competitive rates for personal and commercial wheels.</p>
                            <ul class="service-list">
                                <li><i class="fa-solid fa-circle-check"></i> New Vehicle Loans</li>
                                <li><i class="fa-solid fa-circle-check"></i> Used Vehicle Loans</li>
                            </ul>
                        </div>
                        <div class="service-card glass-card">
                            <div class="service-card-icon"><i class="fa-solid fa-credit-card"></i></div>
                            <h3>Cards & Credit</h3>
                            <p>Explore a variety of credit solutions and EMI options.</p>
                            <ul class="service-list">
                                <li><i class="fa-solid fa-circle-check"></i> Credit Cards</li>
                                <li><i class="fa-solid fa-circle-check"></i> Easy EMI Services</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Solar Panels -->
                <div class="tab-pane" id="solar">
                    <div class="services-grid">
                        <div class="service-card glass-card">
                            <div class="service-card-icon"><i class="fa-solid fa-solar-panel"></i></div>
                            <h3>Rooftop Solar</h3>
                            <p>High-efficiency rooftop solar installations for your space.</p>
                            <ul class="service-list">
                                <li><i class="fa-solid fa-circle-check"></i> Residential Solar</li>
                                <li><i class="fa-solid fa-circle-check"></i> Commercial Solar</li>
                            </ul>
                        </div>
                        <div class="service-card glass-card">
                            <div class="service-card-icon"><i class="fa-solid fa-lightbulb"></i></div>
                            <h3>Energy Solutions</h3>
                            <p>Expert guidance on optimizing your energy consumption.</p>
                            <ul class="service-list">
                                <li><i class="fa-solid fa-circle-check"></i> Solar Consultation</li>
                                <li><i class="fa-solid fa-circle-check"></i> Energy Saving Solutions</li>
                            </ul>
                        </div>
                        <div class="service-card glass-card">
                            <div class="service-card-icon"><i class="fa-solid fa-tools"></i></div>
                            <h3>Maintenance</h3>
                            <p>Reliable support and maintenance for solar arrays.</p>
                            <ul class="service-list">
                                <li><i class="fa-solid fa-circle-check"></i> Panel Cleaning</li>
                                <li><i class="fa-solid fa-circle-check"></i> System Diagnostics</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Online Services -->
                <div class="tab-pane" id="online">
                    <div class="services-grid">
                        <div class="service-card glass-card">
                            <div class="service-card-icon"><i class="fa-solid fa-address-card"></i></div>
                            <h3>Government IDs</h3>
                            <p>Complete application support for essential documents.</p>
                            <ul class="service-list">
                                <li><i class="fa-solid fa-circle-check"></i> PAN Card</li>
                                <li><i class="fa-solid fa-circle-check"></i> Aadhaar</li>
                                <li><i class="fa-solid fa-circle-check"></i> Passport</li>
                            </ul>
                        </div>
                        <div class="service-card glass-card">
                            <div class="service-card-icon"><i class="fa-solid fa-briefcase"></i></div>
                            <h3>Business Compliance</h3>
                            <p>Establish and report your business statuses online.</p>
                            <ul class="service-list">
                                <li><i class="fa-solid fa-circle-check"></i> GST Returns</li>
                                <li><i class="fa-solid fa-circle-check"></i> MSME Registration</li>
                                <li><i class="fa-solid fa-circle-check"></i> IT Returns</li>
                            </ul>
                        </div>
                        <div class="service-card glass-card">
                            <div class="service-card-icon"><i class="fa-solid fa-file-invoice"></i></div>
                            <h3>Employee Services</h3>
                            <p>Hassle-free utility management for current and former staff.</p>
                            <ul class="service-list">
                                <li><i class="fa-solid fa-circle-check"></i> PF Services</li>
                                <li><i class="fa-solid fa-circle-check"></i> UAN Activation</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- Why Choose Us Section -->"""

content = content[:content.find(services_start_marker)] + services_html + content[content.find(services_end_marker) + len(services_end_marker):]


with open('index.html', 'w') as f:
    f.write(content)


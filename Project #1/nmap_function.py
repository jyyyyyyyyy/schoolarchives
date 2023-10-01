#!/usr/bin/python3

# Run -> python3 nmap_function.py -s <input file> -o <output file>

import nmap
import argparse
import json

def nmap_domain(file_input, file_output):
    nm = nmap.PortScanner()
    try:
        with open(file_input) as file1:
            for line in file1:
                line = line.strip()
                print("Port scan for: " + line)
                fileoutput_name = file_output + line + '_nmap.json'
                json_input = []

                # need to run as root for UDP scan
                nm.scan(hosts=line,  arguments="-sT -sU -sV -F --allports --version-intensity 0")
                nm.all_hosts()
                for host in nm.all_hosts():
                    for proto in nm[host].all_protocols():
                        ports = nm[host][proto].keys()
                        for port in ports:
                            state = nm[host][proto][port]['state']
                            if state == 'open':
                                json_output = {"PORT":port, "PROTOCOL":proto, "SERVICE":nm[host][proto][port]['name'], \
                                "PRODUCT":nm[host][proto][port]['product'], "VERSION":nm[host][proto][port]['version'], \
                                "INFORMATION":nm[host][proto][port]['extrainfo'], "CONF": nm[host][proto][port]['conf'], \
                                "CPE": nm[host][proto][port]['cpe']}
                                json_input.append(json_output)

                with open(fileoutput_name, "w") as f:
                    json.dump(json_input, f, indent=4, separators=(',',': '))

    except Exception as e:
        print(e)

    except KeyboardInterrupt:
        print("User interruption")

def main():
    parser = argparse.ArgumentParser(description='Port scan using nmap library.')
    parser.add_argument('-s', dest="source", required=True,type=str,help="Source input file")
    parser.add_argument('-o', dest="output",required=True,type=str,help="Output file name")

    args = parser.parse_args()
    file_input = args.source
    file_output = args.output

    nmap_domain(file_input, file_output)

if __name__ == "__main__":
    main()
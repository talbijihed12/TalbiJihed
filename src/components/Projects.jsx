import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "Find Pharma",
    image: "projects/findpharma.png",
    description: "Development of a Personalized Pharmaceutical Platform",
    url: "https://github.com/talbijihed12/plateforme-pharmaceutique-personnalisee"

  },
  {
    title: "Leave Project",
    image: "projects/7.jpg",
    description: "Simplify leave requests for employees, automate balance calculations, exclude holidays and Sundays, and forward to managers for approval.",
  },
  {
    title: "KS plateform",
    image: "projects/jihed.png",
    description: "Design and Development of a Web Application for a Knowledge Sharing Platform.",
    url: "https://github.com/talbijihed12/knowledge-sharing-platform"

  },
  {
    title: "Meta-Mask",
    image: "projects/second.png",
    description: "Meta-Mask is a NFT collection of masks with a real form and function in the Metaverse.",
    url: "https://opensea.io/fr/MetaMaskMtsj"

  },
  {
    title: "SSO ",
    image: "projects/ml2.png",
    description: "management of restaurant and foyer of a university",
    url:"https://github.com/talbijihed12/Single-sign-on-module-for-managing-catering-and-foyer-of-a-university"
  },
  {
    title: "IJA CAMPI",
    image: "projects/ijacampi.png",
    description: "Use React Three Fiber to create a 3D game",
    url: "https://github.com/talbijihed12/IJA-CAMPI"

  },
  {
    title: "TOOTHCARE",
    image: "projects/acceuil.PNG",
    description: "An application to streamline patient registration, minimize waiting times, and enhance patient care.",
    url: "https://github.com/talbijihed12/dental-clinic-application"

  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
